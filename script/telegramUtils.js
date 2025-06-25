// telegramUtils.js
const BOT_TOKEN = "7227860086:AAG7q39S0YSPz01JToZhs_D1h-6b4sqRpBI";
const TELEGRAM_API_BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const LOCAL_STORAGE_CURRENT_CHAT_ID_KEY = "telegram_current_chat_id";
const LOCAL_STORAGE_OLD_CHAT_ID_KEY = "telegram_old_chat_id";

// Now always use sessionStorage
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
            const oldId = safeGetStorage(LOCAL_STORAGE_CURRENT_CHAT_ID_KEY);
            if (!oldId || oldId !== String(chatId)) {
              if (oldId) safeSetStorage(LOCAL_STORAGE_OLD_CHAT_ID_KEY, oldId);
              safeSetStorage(LOCAL_STORAGE_CURRENT_CHAT_ID_KEY, String(chatId));
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

async function sendTelegramReceiptImage(chatId, imageBlob, caption = "") {
  const apiUrl = `${TELEGRAM_API_BASE_URL}/sendPhoto`;

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", imageBlob, "receipt.png");
  if (caption) {
    formData.append("caption", caption);
    formData.append("parse_mode", "HTML");
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("Telegram API error:", data.description);
    }
    return data.ok;
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
  const estimatedHeight = 600 + cart.length * 60;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // High-DPI scaling
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 400 * dpr;
  canvas.height = estimatedHeight * dpr;
  canvas.style.width = "400px";
  canvas.style.height = `${estimatedHeight}px`;
  ctx.scale(dpr, dpr);

  // Wait for font to be ready
  await document.fonts.ready;

  // Background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

  let yOffset = 40;

  ctx.font = "bold 24px Inter, sans-serif";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText("SUCCESS", 200, yOffset);
  yOffset += 50;

  ctx.textAlign = "left";
  ctx.font = "16px Inter, sans-serif";
  ctx.fillStyle = "#666";
  ctx.fillText("Transfer to:", 20, yOffset);
  yOffset += 25;

  const savedPaymentMethod =
  localStorage.getItem("selectedPaymentMethod") || "";
  ctx.fillText(savedPaymentMethod, 20, yOffset);
  yOffset += 20;

  ctx.font = "16px Inter, sans-serif";
  ctx.fillStyle = "#000";
  ctx.fillText("Item", 20, yOffset);
  yOffset += 30;

  const imagePromises = cart.map((item) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = item.imgSrc || "";
      img.onload = () => resolve({ item, img });
      img.onerror = () => resolve({ item, img: null });
    });
  });

  const images = await Promise.all(imagePromises);

  for (const { item, img } of images) {
    if (img) {
      ctx.drawImage(img, 20, yOffset - 20, 40, 40);
    }

    ctx.textAlign = "left";
    ctx.font = "14px Inter, sans-serif";
    ctx.fillStyle = "#000";
    ctx.fillText(item.name, 70, yOffset);

    ctx.textAlign = "right";
    ctx.fillText(`x ${item.quantity}`, 380, yOffset);

    yOffset += 50;
  }

  ctx.strokeStyle = "#EEE";
  ctx.beginPath();
  ctx.moveTo(20, yOffset);
  ctx.lineTo(380, yOffset);
  ctx.stroke();
  yOffset += 30;

  const now = new Date();
  const transactionDateTime = `${now.getFullYear()}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;

  ctx.font = "14px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(transactionDateTime, 20, yOffset);
  yOffset += 40;

  const drawLineItem = (label, value, isCurrency = true) => {
    ctx.textAlign = "left";
    ctx.fillText(label, 20, yOffset);
    ctx.textAlign = "right";

    if (isCurrency) {
      const usdText = `${value.toFixed(2)} USD`;
      const khrValue = value * 4100;
      const khrText = `${Math.round(khrValue).toLocaleString()} ៛`;

      ctx.fillText(usdText, 380, yOffset);
      yOffset += 20;

      ctx.fillStyle = "#888";
      ctx.fillText(khrText, 380, yOffset);
      ctx.fillStyle = "#000";
    } else {
      ctx.fillText(value, 380, yOffset);
    }

    yOffset += 30;
  };

  drawLineItem("Amount", amount);
  drawLineItem("Discount", discount);
  drawLineItem("Fee", fee);
  drawLineItem("Cross Currency", crossCurrency, false);

  yOffset += 10;
  ctx.beginPath();
  ctx.moveTo(20, yOffset);
  ctx.lineTo(380, yOffset);
  ctx.stroke();
  yOffset += 30;

  ctx.font = "bold 20px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Total Payment", 20, yOffset);

  ctx.textAlign = "right";
  ctx.fillText(`${totalPayment.toFixed(2)} USD`, 380, yOffset);
  yOffset += 25;
  const formattedKHR = new Intl.NumberFormat("km-KH", {
    style: "currency",
    currency: "KHR",
    currencyDisplay: "symbol",
  }).format(Math.round(totalPayment * 4100));
  ctx.fillText(formattedKHR, 380, yOffset);
  yOffset += 30;
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export {
  sendTelegramMessageToUser,
  startTelegramPolling,
  safeSetStorage as safeSetLocalStorage,
  safeGetStorage as safeGetLocalStorage,
  sendTelegramReceiptImage,
  generateReceiptImage,
  LOCAL_STORAGE_CURRENT_CHAT_ID_KEY,
  LOCAL_STORAGE_OLD_CHAT_ID_KEY,
};
