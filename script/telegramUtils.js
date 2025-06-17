// telegramUtils.js

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

function safeSetLocalStorage(key, value) {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
}

function safeGetLocalStorage(key) {
  return isLocalStorageAvailable()
    ? localStorage.getItem(key)
    : sessionStorage.getItem(key);
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
      const lastUpdateId = parseInt(safeGetLocalStorage("lastUpdateId") || "0");
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
            const oldId = safeGetLocalStorage(
              LOCAL_STORAGE_CURRENT_CHAT_ID_KEY
            );
            if (!oldId || oldId !== String(chatId)) {
              if (oldId)
                safeSetLocalStorage(LOCAL_STORAGE_OLD_CHAT_ID_KEY, oldId);
              safeSetLocalStorage(
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
        safeSetLocalStorage("lastUpdateId", lastId.toString());
      }
    }
  } catch (err) {
    isPollingActive = false;
    setTimeout(startTelegramPolling, 10000);
  }
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
async function generateReceiptImage(
  amount,
  discount,
  fee,
  crossCurrency,
  totalPayment,
  cart
) {
  // Estimate height based on cart size
  const estimatedHeight = 600 + cart.length * 40;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = estimatedHeight;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let yOffset = 40;

  // Title
  ctx.font = "bold 24px Inter, sans-serif";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText("SUCCESS", canvas.width / 2, yOffset);
  yOffset += 50;

  // Bank Info
  ctx.textAlign = "left";
  ctx.font = "16px Inter, sans-serif";
  ctx.fillStyle = "#666";
  ctx.fillText("Transfer to:", 20, yOffset);
  yOffset += 25;
  const savedPaymentMethod = localStorage.getItem("selectedPaymentMethod");
  const paymentText = savedPaymentMethod ? savedPaymentMethod : "";

  ctx.fillText(paymentText, 20, yOffset);
  yOffset += 40;

  // Items Section
  ctx.font = " Khmer, sans-serif !important"; // Khmer-capable font
  ctx.fillStyle = "#000";
  ctx.fillText("Item", 20, yOffset);
  yOffset += 40;

  ctx.font = "14px Battambang, sans-serif";

  cart.forEach((item) => {
    ctx.textAlign = "left";
    ctx.fillText(item.name, 20, yOffset);

    ctx.textAlign = "right";
    ctx.fillText(`x ${item.quantity}`, canvas.width - 20, yOffset);

    yOffset += 30;
  });

  ctx.textAlign = "left";
  ctx.strokeStyle = "#EEE";
  ctx.beginPath();
  ctx.moveTo(20, yOffset);
  ctx.lineTo(canvas.width - 20, yOffset);
  ctx.stroke();
  yOffset += 30;

  // DateTime
  const now = new Date();
  const transactionDateTime = `${now.getFullYear()}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
  ctx.font = "14px Inter, sans-serif";
  ctx.fillText(transactionDateTime, 20, yOffset);
  yOffset += 40;

  // Line Items (Amount, Discount, etc.)
  const drawLineItem = (label, value, isCurrency = true) => {
    ctx.fillText(label, 20, yOffset);
    ctx.textAlign = "right";

    if (isCurrency) {
      const usdText = `${value.toFixed(2)} USD`;
      const khrValue = value * 4100;
      const khrText = `${khrValue.toLocaleString()} ៛`;

      // Draw USD line
      ctx.fillText(usdText, canvas.width - 20, yOffset);
      yOffset += 20;

      // Draw KHR line (in lighter gray or smaller font if desired)
      ctx.fillStyle = "#888"; // optional: gray color
      ctx.fillText(khrText, canvas.width - 20, yOffset);
      ctx.fillStyle = "#000"; // reset to black
    } else {
      ctx.fillText(value, canvas.width - 20, yOffset);
    }

    ctx.textAlign = "left";
    yOffset += 30;
  };

  drawLineItem("Amount", amount);
  drawLineItem("Discount", discount);
  drawLineItem("Fee", fee);
  drawLineItem("Cross Currency", crossCurrency, false);

  yOffset += 20;
  ctx.beginPath();
  ctx.moveTo(20, yOffset);
  ctx.lineTo(canvas.width - 20, yOffset);
  ctx.stroke();
  yOffset += 30;

  // Total Payment
  ctx.font = "bold 20px Inter, sans-serif";
  ctx.fillText("Total Payment", 20, yOffset);

  const totalPaymentKHR = totalPayment * 4100;

  const formattedUSD = `${totalPayment.toFixed(2)} USD`;
  const formattedKHR = `${Math.round(totalPaymentKHR)} KHR`;

  ctx.textAlign = "right";
  ctx.fillText(formattedUSD, canvas.width - 20, yOffset);

  yOffset += 30;
  ctx.fillText(formattedKHR, canvas.width - 20, yOffset);
  ctx.textAlign = "left";
  yOffset += 60;
  ctx.font = "bold 18px Inter, sans-serif";
  ctx.textAlign = "center";
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

// Export functions and constants
export {
  sendTelegramMessageToUser,
  startTelegramPolling,
  safeSetLocalStorage,
  safeGetLocalStorage,
  sendTelegramReceiptImage,
  generateReceiptImage,
  LOCAL_STORAGE_CURRENT_CHAT_ID_KEY,
  LOCAL_STORAGE_OLD_CHAT_ID_KEY,
};
