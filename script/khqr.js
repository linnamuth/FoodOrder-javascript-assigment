import {
  startTelegramPolling,
  sendTelegramReceiptImage,
  safeGetLocalStorage,
  generateReceiptImage,
  LOCAL_STORAGE_CURRENT_CHAT_ID_KEY,
} from "./telegramUtils.js";
startTelegramPolling();
const canvas = document.getElementById("qrCanvas");

const qr = new QRious({
  element: canvas,
  value: "9497899756A7", // Replace with your real value
  size: 300,
  level: "H",
});

const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 20;

// Draw dollar sign
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
ctx.fillStyle = "black";
ctx.fill();
ctx.lineWidth = 3;
ctx.strokeStyle = "white";
ctx.stroke();

ctx.font = "bold 20px Arial";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("$", centerX, centerY);

// Load cart & show price
const carts = JSON.parse(localStorage.getItem("cart")) || [];
const totalPrice = carts.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
document.getElementById("price").textContent = `$ ${totalPrice.toFixed(2)}`;

async function done() {
  const chatId = safeGetLocalStorage(LOCAL_STORAGE_CURRENT_CHAT_ID_KEY);
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.style.display = "flex";
  if (!chatId) {
    loadingOverlay.style.display = "none";

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

  document.getElementById("payButton").disabled = true;

  const cart = carts;
  const storeId = ""; // Fill if you're filtering by store
  const updatedCart = cart.filter((item) => item.storeId !== storeId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  let totalOrderAmount = 0;
  cart.forEach((item) => (totalOrderAmount += item.price * item.quantity));

  const discount = 0.0;
  const fee = 0.0;
  const crossCurrency = "No";
  const finalTotalPayment = totalOrderAmount + fee - discount;

  let captionMessage = `✅ <b>ការបញ្ជាទិញរបស់អ្នកបានជោគជ័យ!</b>\n`;
  captionMessage += `🕐 សូមរង់ចាំខណៈដែលហាងកំពុងរៀបចំ។\n\n`;
  captionMessage += `\n🙏 សូមអរគុណសម្រាប់ការទិញជាមួយយើង!`;

  const MIN_LOADING_DURATION = 700;
  const startTime = Date.now();

  const receiptImageBlob = await generateReceiptImage(
    totalOrderAmount,
    discount,
    fee,
    crossCurrency,
    finalTotalPayment,
    cart
  );

  if (receiptImageBlob) {
    const sent = await sendTelegramReceiptImage(
      chatId,
      receiptImageBlob,
      captionMessage
    );
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_LOADING_DURATION - elapsed);
    await new Promise((resolve) => setTimeout(resolve, remaining));

    if (sent) {
      localStorage.removeItem("cart"); // ✅ Only clear cart after success
      loadingOverlay.style.display = "none";
      window.location.href = "success.html";
      return;
    }
    loadingOverlay.style.display = "none";
    resultMessage.className = "alert alert-danger d-block";
    resultMessage.textContent = "Failed to send receipt. Please try again.";
  }

  document.getElementById("payButton").disabled = false;
  Swal.fire("Error", "Failed to send receipt. Please try again.", "error");
}

document.getElementById("payButton").addEventListener("click", done);
