
const BOT_TOKEN = "7227860086:AAG7q39S0YSPz01JToZhs_D1h-6b4sqRpBI";
const TELEGRAM_API_BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const LOCAL_STORAGE_CURRENT_CHAT_ID_KEY = "telegram_current_chat_id";
const LOCAL_STORAGE_OLD_CHAT_ID_KEY = "telegram_old_chat_id";

function isLocalStorageAvailable() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
}

function safeSetStorage(key, value) {
  sessionStorage.setItem(key, value);
}

function safeGetStorage(key) {
  return sessionStorage.getItem(key);
}

async function sendTelegramMessageToUser(chatId, message) {
  const url = `${TELEGRAM_API_BASE_URL}/sendMessage`;
  const payload = { chat_id: chatId, text: message, parse_mode: "HTML" };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error("Telegram error:", error);
    return false;
  }
}

let isPollingActive = false;
async function startTelegramPolling() {
  if (isPollingActive) return;
  isPollingActive = true;
  try {
    while (isPollingActive) {
      const lastUpdateId = parseInt(safeGetStorage("lastUpdateId") || "0");
      const url = `${TELEGRAM_API_BASE_URL}/getUpdates?offset=${
        lastUpdateId + 1
      }&timeout=30`;

      let data;
      try {
        const res = await fetch(url);
        data = await res.json();
      } catch {
        continue;
      }

      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          const chatId = update.message?.chat?.id;
          const text = update.message?.text?.trim().toLowerCase();
          if (text === "/start" && chatId) {
            const oldId = safeGetStorage(
              LOCAL_STORAGE_CURRENT_CHAT_ID_KEY
            );
            if (!oldId || oldId !== String(chatId)) {
              if (oldId)
                safeSetStorage(LOCAL_STORAGE_OLD_CHAT_ID_KEY, oldId);
              safeSetStorage(
                LOCAL_STORAGE_CURRENT_CHAT_ID_KEY,
                String(chatId)
              );
            }
            await sendTelegramMessageToUser(
              chatId,
              '👋 សូមស្វាគមន៍មកកាន់ហាងម្ហូបរបស់យើង!\n\n📌 សូមចុចប៊ូតុង "Order" ដើម្បីជ្រើសរើស និងកម្មង់ម្ហូបដែលអ្នកចង់ទទួលទាន។\n\n🙏 សូមអរគុណសម្រាប់ការគាំទ្រ!'
            );
          }
        }
        const lastId = data.result[data.result.length - 1].update_id;
        safeSetStorage("lastUpdateId", lastId.toString());
      }
    }
  } catch (err) {
    isPollingActive = false;
    setTimeout(startTelegramPolling, 10000);
  }
}

const LOCAL_STORAGE_SELECTED_BANK_KEY = "selectedBank";
function changeBank(bank) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const amount = document.getElementById("amount");
  const total = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  amount.value = `$${total.toFixed(2)}`;

  ["aba", "wing", "acleda", "kb", "amret"].forEach((b) => {
    const logo = document.getElementById(`${b}Logo`);
    if (logo) logo.classList.remove("selected");
  });

  const selectedLogo = document.getElementById(`${bank}Logo`);
  if (selectedLogo) {
    selectedLogo.classList.add("selected");
  }

  const config = {
    aba: ["ABA Bank", "#006F75", "ABA Bank Payment"],
    wing: ["Wing Bank", "rgb(169, 207, 56)", "Wing Bank Payment"],
    acleda: ["ACLEDA Bank", "#002F6C", "ACLEDA Bank Payment"],
    kb: ["KB PRASAC Bank", "#FFCC00", "KB PRASAC Bank Payment"],
    amret: ["AMRET Bank", "rgb(1, 129, 66)", "AMRET Bank Payment"],
  };

  if (config[bank]) {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_BANK_KEY, bank);
    updateBankInfo(...config[bank]);
  }
}

(function setDefaultBankIfNoneSelected() {
  const selectedBank = localStorage.getItem("selectedBank");
  if (!selectedBank) {
    changeBank("aba");
  } else {
    changeBank(selectedBank);
  }
})();

function updateBankInfo(name, color, instructions) {
  document.querySelector("h2").textContent = `${name} Payment`;
  document.querySelector(".btn-aba").style.backgroundColor = color;
  const result = document.getElementById("paymentResult");
  result.className = "alert alert-info d-block";
  result.textContent = instructions;
}

window.onload = () => changeBank("aba");
document.getElementById("paymentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Show loading overlay
  document.getElementById("loadingOverlay").style.display = "flex";

  const resultMessage = document.getElementById("paymentResult");
  const urlParams = new URLSearchParams(window.location.search);
  const force = urlParams.get("force");
  let success;

  if (force === "success") {
    success = true;
  } else if (force === "fail") {
    success = false;
  } else {
    success = Math.random() > 0.5;
  }

  const chatId = safeGetStorage(LOCAL_STORAGE_CURRENT_CHAT_ID_KEY);

  if (!chatId) {
    resultMessage.className = "alert alert-info d-block";
    resultMessage.textContent =
      "Please start the bot before proceeding with payment.";
    document.getElementById("loadingOverlay").style.display = "none"; // hide loading
    Swal.fire({
      icon: "info",
      title: "Start Telegram Bot",
      text: "Please click 'Start' in the Telegram bot before proceeding.",
      confirmButtonText: "Go to Telegram Bot",
    }).then(() => {
      window.location.href = "https://t.me/OrderFastDeliverybot";
    });
    return;
  }

  // Show success/fail status
  resultMessage.className = `alert alert-${
    success ? "success" : "danger"
  } d-block`;
  resultMessage.textContent = success
    ? "Payment successful!"
    : "Payment failed. Please try again.";

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  let totalOrderAmount = 0;
  cart.forEach((item) => {
    totalOrderAmount += item.price * item.quantity;
  });

  const discount = 0.0;
  const fee = 0.0;
  const crossCurrency = "No";
  const finalTotalPayment = totalOrderAmount + fee - discount;

  // Build Telegram message
  let captionMessage = `✅ <b>ការបញ្ជាទិញរបស់អ្នកបានជោគជ័យ!</b>\n`;
  captionMessage += `🕐 សូមរង់ចាំខណៈដែលហាងកំពុងរៀបចំ។\n\n`;
  captionMessage += `<b>🔖 ព័ត៌មានការបញ្ជាទិញ:</b>\n`;

  let totalCartAmount = 0;
  cart.forEach((item, i) => {
    const subtotal = item.price * item.quantity;
    totalCartAmount += subtotal;
    const size = item.size || "ធម្មតា";
    captionMessage += `${i + 1}. ${item.name} (${size}) x ${item.quantity}\n`;
  });

  captionMessage += `\n🙏 សូមអរគុណសម្រាប់ការទិញជាមួយយើង!`;

  // Generate image receipt
  const receiptImageBlob = await generateReceiptImage(
    totalOrderAmount,
    discount,
    fee,
    crossCurrency,
    finalTotalPayment
  );

  if (receiptImageBlob) {
    const sent = await sendTelegramReceiptImage(
      chatId,
      receiptImageBlob,
      captionMessage
    );
    if (sent) {
      localStorage.removeItem("cart");
      document.getElementById("loadingOverlay").style.display = "none"; // hide loading
      window.location.href = "success.html";
    }
  } else {
    document.getElementById("loadingOverlay").style.display = "none";
  }
});

async function generateReceiptImage(
  amount,
  discount,
  fee,
  crossCurrency,
  totalPayment
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = 400;
  const height = 600; 
  canvas.width = width;
  canvas.height = height;
  // Background
  ctx.fillStyle = "#FFFFFF"; // White background
  ctx.fillRect(0, 0, width, height);

  let yOffset = 40; // Initial vertical offset for drawing

  // "SUCESS" Header
  ctx.font = "bold 24px Inter, sans-serif";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.fillText("SUCESS", width / 2, yOffset);
  yOffset += 50;

  ctx.textAlign = "left"; 
  // "Transfer to" Section
  ctx.font = "16px Inter, sans-serif";
  ctx.fillStyle = "#666666";
  ctx.fillText("Transfer to:", 20, yOffset);
  yOffset += 25;
  const bankName = localStorage.getItem("selectedBank") || "ABA Bank";
  ctx.fillText(bankName, 20, yOffset);
  yOffset += 40;

  // Line separator
  ctx.strokeStyle = "#EEEEEE";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(20, yOffset);
  ctx.lineTo(width - 20, yOffset);
  ctx.stroke();
  yOffset += 30;

  // "Transaction details" Header
  ctx.font = "bold 18px Inter, sans-serif";
  ctx.fillStyle = "#333333";
  ctx.fillText("Transaction details", 20, yOffset);
  yOffset += 25;

  // Date and Time
  const now = new Date();
  const transactionDateTime = `${now.getFullYear()}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
  ctx.font = "14px Inter, sans-serif";
  ctx.fillStyle = "#666666";
  ctx.fillText(transactionDateTime, 20, yOffset);
  yOffset += 40;

  // Transaction Line Items (Amount, Discount, Fee, Cross Currency)
  ctx.font = "16px Inter, sans-serif";
  ctx.fillStyle = "#333333";

  // Helper function to draw a key-value pair with right alignment for value
  const drawLineItem = (label, value, isCurrency = true) => {
    ctx.fillText(label, 20, yOffset);
    ctx.textAlign = "right";
    if (isCurrency) {
      ctx.fillText(`${value.toFixed(2)} USD`, width - 20, yOffset);
    } else {
      ctx.fillText(value, width - 20, yOffset);
    }
    ctx.textAlign = "left"; // Reset for next line
    yOffset += 30;
  };

  drawLineItem("Amount", amount);
  drawLineItem("Discount", discount);
  drawLineItem("Fee", fee);
  drawLineItem("Cross Currency", crossCurrency, false); // Not a currency value
  yOffset += 20;

  // Line separator before Total Payment
  ctx.beginPath();
  ctx.moveTo(20, yOffset);
  ctx.lineTo(width - 20, yOffset);
  ctx.stroke();
  yOffset += 30;

  // "Total Payment" Section
  ctx.font = "bold 20px Inter, sans-serif";
  ctx.fillStyle = "#333333";
  ctx.fillText("Total Payment", 20, yOffset);
  ctx.textAlign = "right";
  ctx.fillText(`${totalPayment.toFixed(2)} USD`, width - 20, yOffset);
  ctx.textAlign = "left";
  yOffset += 60;

  // "Transaction Completed" with checkmark
  ctx.font = "bold 18px Inter, sans-serif";
  ctx.fillStyle = "#333333";
  ctx.textAlign = "center";
  ctx.fillText("Transaction Completed ✅", width / 2, yOffset);
  yOffset += 30;

  // Convert canvas to Blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/png");
  });
}

async function sendTelegramReceiptImage(chatId, imageBlob, caption = "") {
  const apiUrl = `https://api.telegram.org/bot7227860086:AAG7q39S0YSPz01JToZhs_D1h-6b4sqRpBI/sendPhoto`;

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", imageBlob, "receipt.png"); // Append the blob as a file
  if (caption) {
    formData.append("caption", caption); // Add caption if provided
    formData.append("parse_mode", "HTML"); // Enable HTML parsing for the caption
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData, // FormData handles 'Content-Type' automatically
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("Telegram API error:", data.description);
    }
    return data.ok; // Return true if image is sent successfully, false otherwise
  } catch (error) {
    console.error("Error sending Telegram image:", error);
    return false;
  }
}

startTelegramPolling();
