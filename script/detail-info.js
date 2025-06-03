document.addEventListener("DOMContentLoaded", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Initialize the map
    const map = L.map("map").setView([lat, lon], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([lat, lon]).addTo(map).bindPopup("You are here!").openPopup();

    // Use reverse geocoding API to get the address from coordinates
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        const address = data.display_name || "Unknown location";
        // Update the address in the DOM
        document.getElementById("current-address").textContent = address;
      })
      .catch((error) => {
        console.error("Error fetching the address:", error);
        document.getElementById("current-address").textContent =
          "Unable to fetch address";
      });
  }

  function showError(error) {
    alert("Unable to retrieve your location.");
    document.getElementById("current-address").textContent =
      "Unable to fetch address";
  }
});

function updateOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const summaryContainer = document.getElementById("orderSummary");
  if (!summaryContainer) return;

  summaryContainer.innerHTML = ""; // Clear any previous content

  let subtotal = 0;
  // Add each item
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    summaryContainer.innerHTML += `
      <div class="d-flex justify-content-between">
        <span>${item.quantity} × ${item.name}</span>
        <span>$ ${itemTotal.toFixed(2)}</span>
      </div>
    `;
  });

  // Add subtotal, delivery, VAT, total
  const vat = +(subtotal * 0.01).toFixed(2); // Example: 1% VAT
  const total = subtotal + vat;

  summaryContainer.innerHTML += `
    <hr />
    <div class="d-flex justify-content-between">
      <span>Subtotal</span>
      <span>$ ${subtotal.toFixed(2)}</span>
    </div>
    <div class="d-flex justify-content-between">
      <span>Standard delivery</span>
      <span>Free</span>
    </div>
    <div class="d-flex justify-content-between">
      <span>VAT</span>
      <span>$ ${vat.toFixed(2)}</span>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <strong>Total</strong>
      <strong>$ ${total.toFixed(2)}</strong>
    </div>
    <small class="text-muted">incl. fees and tax</small>
  `;
}
// --- Configuration ---
const BOT_TOKEN = "7905488546:AAEmKWK4drRr3j_yVoCStqqokwhESaG7UlM";
const TELEGRAM_API_BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const LOCAL_STORAGE_CHAT_ID_KEY = "telegramChatIds";

// Function to fetch chat IDs linked to users
async function fetchAndStoreUserChatId() {
  const url = `${TELEGRAM_API_BASE_URL}/getUpdates`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok && data.result.length > 0) {
      for (const update of data.result) {
        const message = update?.message;
        const chatId = message?.chat?.id;
        const text = message?.text;
        if (text && text.trim().toLowerCase() === "/start") {
          // ✅ Store the chat ID in localStorage
          localStorage.setItem(LOCAL_STORAGE_CHAT_ID_KEY, chatId);
          console.log("✅ Linked Telegram chat ID:", chatId);

          break;
        }
      }
    } else {
      console.warn("No updates found.");
    }
  } catch (error) {
    console.error("Error fetching chat ID from Telegram:", error);
  }
}

// Function to send messages to the user
let lastUpdateId = parseInt(localStorage.getItem("lastUpdateId") || "0");
let isPolling = false;
const processedUpdateIds = new Set();
async function sendTelegramMessageToUser(chatId, message, replyMarkup = null) {
  const url = `${TELEGRAM_API_BASE_URL}/sendMessage`;

  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
  };

  if (replyMarkup) {
    payload.reply_markup = replyMarkup;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error(`Telegram API error: ${data.description}`);
      throw new Error(data.description);
    }
    return true;
  } catch (error) {
    console.error(`❌ Failed to send message to ${chatId}:`, error);
    return false;
  }
}

async function fetchAndHandleUpdates() {
  if (isPolling) {
    console.log("Polling already in progress. Skipping.");
    return;
  }
  isPolling = true;
  const url = `${TELEGRAM_API_BASE_URL}/getUpdates?offset=${lastUpdateId + 1}`; // Added timeout
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok && data.result.length > 0) {
      let maxUpdateIdInCurrentBatch = lastUpdateId; // Initialize with current lastUpdateId

      for (const update of data.result) {
        const updateId = update.update_id;

        maxUpdateIdInCurrentBatch = Math.max(
          maxUpdateIdInCurrentBatch,
          updateId
        );
        if (processedUpdateIds.has(updateId)) {
          continue;
        }
        processedUpdateIds.add(updateId); // Mark as processed

        const message = update.message;
        const chatId = message?.chat?.id;
        const text = message?.text?.trim().toLowerCase();

        if (text === "/start") {


          const messageSent = await sendTelegramMessageToUser(
            chatId,
            "👋សូមស្វាគមន៍មកកាន់ហាងរបស់ខ្ញុំ! \n\n ចុច Button Start ដើម្បីធ្វើការ Order work",
          );
          if (messageSent) {
            localStorage.setItem(LOCAL_STORAGE_CHAT_ID_KEY, chatId.toString());
          }
        }
      }
      lastUpdateId = maxUpdateIdInCurrentBatch;
      localStorage.setItem("lastUpdateId", lastUpdateId.toString());
    } else {
      console.log("No new updates found or data.ok is false.");
    }
  } catch (error) {
    console.error("⚠️ Error fetching updates:", error);
  } finally {
    isPolling = false; // Allow new polling requests
  }
}

// Poll every 2 seconds
setInterval(fetchAndHandleUpdates, 2000);

async function handlePlaceOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Cart is Empty",
      text: "Please add some items before placing an order.",
    });
    return;
  }

  const currentStoreId = cart[0]?.storeId;
  const storeCartItems = cart.filter((item) => item.storeId === currentStoreId);
  const remainingItems = cart.filter((item) => item.storeId !== currentStoreId);
  localStorage.setItem("cart", JSON.stringify(remainingItems));

  const currentStoreName = storeCartItems[0]?.storeName || "Our Store";

  let orderText = `✅ Your order from <b>${currentStoreName}</b> has been placed successfully!\n\n<b>Details:</b>\n`;
  storeCartItems.forEach((item, index) => {
    orderText += `${index + 1}. ${item.name} x ${item.quantity}\n`;
  });
  orderText += "\nThank you for your purchase!";

  // Retrieve chat ID linked to the user
  const chatId = localStorage.getItem(LOCAL_STORAGE_CHAT_ID_KEY);

  // Send message to the linked user
  if (chatId) {
    const messageSent = await sendTelegramMessageToUser(chatId, orderText);

    if (messageSent) {
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been successfully submitted.",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "index.html"; // Redirect after order is placed
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Order Placed, but Notification Failed",
        text: "Your order was placed, but we couldn't send a notification to Telegram. Please check manually.",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "index.html"; // Redirect after error
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Telegram Not Linked",
      text: "Please link your Telegram account first.",
      confirmButtonText: "OK",
    });
  }
}

// Initialize the app and bind event listeners
async function initializeApp() {
  await fetchAndStoreUserChatId(); // Only fetch user-linked chatId
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", handlePlaceOrder);
  } else {
    console.error("Element with ID 'placeOrderBtn' not found.");
  }
}
document.addEventListener("DOMContentLoaded", initializeApp);
window.addEventListener("DOMContentLoaded", () => {
  const storedName = localStorage.getItem("username");
  if (storedName) {
    document.getElementById("username").value = storedName;
  }
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (loggedIn) {
    document.getElementById("loginSignupLink").classList.add("d-none");
    document.getElementById("userIcon").classList.remove("d-none");
    if (storedName) {
      document.getElementById("userName").textContent = storedName;
    } else {
      console.error("Username is not set in localStorage.");
    }
  } else {
    document.getElementById("loginSignupLink").classList.remove("d-none");
    document.getElementById("userIcon").classList.add("d-none");
  }
});
updateOrderSummary();
