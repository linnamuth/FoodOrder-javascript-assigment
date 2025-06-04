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
const BOT_TOKEN = "7227860086:AAG7q39S0YSPz01JToZhs_D1h-6b4sqRpBI";
const TELEGRAM_API_BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const LOCAL_STORAGE_CHAT_ID_KEY = "telegram_chat_id";

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    return true;
  } catch (e) {
    console.error("localStorage is not available:", e);
    return false;
  }
}

// Safely set item in localStorage with fallback to sessionStorage
function safeSetLocalStorage(key, value) {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(key, value);
  } else {
    console.warn("localStorage not available. Using sessionStorage.");
    sessionStorage.setItem(key, value); // Fallback to sessionStorage
  }
}

// Safely get item from localStorage with fallback to sessionStorage
function safeGetLocalStorage(key) {
  if (isLocalStorageAvailable()) {
    return localStorage.getItem(key);
  } else {
    console.warn("localStorage not available. Using sessionStorage.");
    return sessionStorage.getItem(key); // Fallback to sessionStorage
  }
}

// Function to fetch and store chat ID linked to users
async function fetchAndStoreUserChatId() {
  const url = `${TELEGRAM_API_BASE_URL}/getUpdates`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Log the entire response for debugging
    console.log("Telegram getUpdates response:", data);

    if (data.ok && data.result.length > 0) {
      for (const update of data.result) {
        const message = update?.message;
        const chatId = message?.chat?.id;
        const text = message?.text;
        if (text && text.trim().toLowerCase() === "/start" && chatId) {
          const existingChatId = safeGetLocalStorage(LOCAL_STORAGE_CHAT_ID_KEY);
          if (!existingChatId) {
            // Store chatId if it's not already saved
            safeSetLocalStorage(LOCAL_STORAGE_CHAT_ID_KEY, chatId);
            console.log(`Chat ID ${chatId} stored successfully.`);
          }
        }
      }
    } else {
      console.warn("No valid updates found.");
    }
  } catch (error) {
    console.error("Error fetching chat ID from Telegram:", error);
  }
}

// Function to send messages to users
async function sendTelegramMessageToUser(chatId, message) {
  const url = `${TELEGRAM_API_BASE_URL}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.ok) {
      console.log("✅ Message sent to", chatId);
      return data;
    } else {
      console.error("❌ Failed to send message:", data);
      return false;
    }
  } catch (error) {
    console.error("❌ Error sending message:", error);
    return false;
  }
}

// Function to fetch & handle messages (polling)
// --- Long Polling Logic ---
let isPollingActive = false;

async function startTelegramPolling() {
  if (isPollingActive) {
    console.log("Polling is already active.");
    return;
  }

  isPollingActive = true;

  try {
    while (isPollingActive) {
      const lastUpdateId = parseInt(safeGetLocalStorage("lastUpdateId") || "0");
      const timeoutSeconds = 30;

      const url = `${TELEGRAM_API_BASE_URL}/getUpdates?offset=${
        lastUpdateId + 1
      }&timeout=${timeoutSeconds}`;

      const controller = new AbortController();
      const fetchTimeoutId = setTimeout(
        () => controller.abort(),
        (timeoutSeconds + 5) * 1000
      );

      let response;
      let data;

      try {
        response = await fetch(url, { signal: controller.signal });
        clearTimeout(fetchTimeoutId);
        data = await response.json();
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          console.warn(
            "Polling request timed out from client side, retrying..."
          );
          continue;
        }
        throw fetchError;
      }
      if (data.ok && data.result.length > 0) {
        for (const update of data.result) {
          const updateId = update.update_id;
          const message = update.message;
          const chatId = message?.chat?.id;
          const text = message?.text?.trim().toLowerCase();
          if (!chatId || !text) {
            continue;
          }
          if (text === "/start") {
            const existingChatId = safeGetLocalStorage(
              LOCAL_STORAGE_CHAT_ID_KEY
            );
            if (!existingChatId || existingChatId !== chatId.toString()) {
              safeSetLocalStorage(LOCAL_STORAGE_CHAT_ID_KEY, chatId.toString());
              console.log(`✅ Chat ID ${chatId} stored successfully.`);
            }

            await sendTelegramMessageToUser(
              chatId,
              '👋 សូមស្វាគមន៍មកកាន់ហាងម្ហូបរបស់យើង!\n\n📌 សូមចុចប៊ូតុង "Order" ដើម្បីជ្រើសរើស និងកម្មង់ម្ហូបដែលអ្នកចង់ទទួលទាន។\n\n🙏 សូមអរគុណសម្រាប់ការគាំទ្រ!'
            );
          }
        }
        const lastReceivedUpdateId =
          data.result[data.result.length - 1].update_id;
        safeSetLocalStorage("lastUpdateId", lastReceivedUpdateId.toString());
      } else if (!data.ok) {
        console.warn(
          "❌ Telegram returned an error response. Retrying in 5 seconds."
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  } catch (error) {
    console.error(
      "⚠️ Critical error in polling loop. Restarting after delay:",
      error
    );
    isPollingActive = false;
    await new Promise((resolve) => setTimeout(resolve, 10000));
    startTelegramPolling(); // Restart polling after delay
  }
}
async function discardOldUpdates() {
  const response = await fetch(`${TELEGRAM_API_BASE_URL}/getUpdates`);
  const data = await response.json();
  if (data.ok && data.result.length > 0) {
    const lastReceivedUpdateId = data.result[data.result.length - 1].update_id;
    safeSetLocalStorage("lastUpdateId", lastReceivedUpdateId.toString());
    console.log(`🔁 Discarded ${data.result.length} old updates`);
  }
}

function stopTelegramPolling() {
  isPollingActive = false;
}
discardOldUpdates();
startTelegramPolling();

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

  const storeId = cart[0]?.storeId;
  const storeItems = cart.filter((item) => item.storeId === storeId);
  const remainingItems = cart.filter((item) => item.storeId !== storeId);
  localStorage.setItem("cart", JSON.stringify(remainingItems));

  const storeName = storeItems[0]?.storeName || "Our Store";

  let message = `✅ ការបញ្ជាទិញពីបានបញ្ចប់ដោយជោគជ័យ!\n\n<b>ព័ត៌មានលម្អិត:</b>\n`;
  storeItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} ចំនួន ${item.quantity}\n`;
  });
  message += "\nសូមអរគុណសម្រាប់ការជាវរបស់អ្នក!";

  const chatId = localStorage.getItem(LOCAL_STORAGE_CHAT_ID_KEY);

  if (chatId) {
    const success = await sendTelegramMessageToUser(chatId, message);
    Swal.fire({
      icon: success ? "success" : "error",
      title: success ? "Order Placed!" : "Order Failed",
      text: success
        ? "Your order has been submitted."
        : "Order placed, but Telegram notification failed.",
    }).then(() => {
      window.location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Telegram Not Linked",
      text: "Please click /start in the Telegram bot first.",
    });
  }
}
// Initialize the app and bind event listeners
async function initializeApp() {
  const chatId = safeGetLocalStorage(LOCAL_STORAGE_CHAT_ID_KEY);
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (!chatId) {
    Swal.fire({
      icon: "info",
      title: "Connect to Telegram",
      html: `
        <p>📲 Please start the Telegram bot to connect.</p>
        <p><strong>Step 1:</strong> Open <a href="https://t.me/OrderFastDeliverybot" target="_blank">@FOODBOT</a></p>
        <p><strong>Step 2:</strong> Send <code>/start</code> in the chat.</p>
        <p>✅ Once connected, come back here to place your order.</p>
      `,
      confirmButtonText: "Got it! I've Connected",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
    if (placeOrderBtn) placeOrderBtn.disabled = true;
  } else {
    if (placeOrderBtn) {
      placeOrderBtn.disabled = false;
      placeOrderBtn.addEventListener("click", handlePlaceOrder);
    }
  }
}

window.onload = initializeApp;

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
