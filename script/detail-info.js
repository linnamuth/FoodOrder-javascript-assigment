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
// --- Configuration ---
const BOT_TOKEN = "8198341379:AAGbgof__nNglbuh9AtN_hMaAaVItglaJ7g";
const TELEGRAM_API_BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const LOCAL_STORAGE_CHAT_ID_KEY = "telegram_chat_id"; 
// --- Local Storage Utility Functions ---
let localStorageAvailable;
try {
    localStorage.setItem("test_availability", "test");
    localStorage.removeItem("test_availability");
    localStorageAvailable = true;
} catch (e) {
    console.error("localStorage is not available. Using sessionStorage as fallback.", e);
    localStorageAvailable = false;
}

function safeSetLocalStorage(key, value) {
    try {
        if (localStorageAvailable) {
            localStorage.setItem(key, value);
        } else {
            sessionStorage.setItem(key, value);
        }
    } catch (e) {
        console.error(`Error setting item '${key}':`, e);
    }
}

function safeGetLocalStorage(key) {
    try {
        if (localStorageAvailable) {
            return localStorage.getItem(key);
        } else {
            return sessionStorage.getItem(key);
        }
    } catch (e) {
        console.error(`Error getting item '${key}':`, e);
        return null;
    }
}
// --- Telegram API Functions ---
async function sendTelegramMessageToUser(chatId, messageText) {
    const url = `${TELEGRAM_API_BASE_URL}/sendMessage`;
    const payload = {
        chat_id: chatId,
        text: messageText,
        parse_mode: "HTML"
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
            const url = `${TELEGRAM_API_BASE_URL}/getUpdates?offset=${lastUpdateId + 1}&timeout=${timeoutSeconds}`;
            const controller = new AbortController();
            const fetchTimeoutId = setTimeout(() => controller.abort(), (timeoutSeconds + 5) * 1000); 
            let response;
            let data;
            try {
                response = await fetch(url, { signal: controller.signal });
                clearTimeout(fetchTimeoutId);
                data = await response.json();
            } catch (fetchError) {
                if (fetchError.name === 'AbortError') {
                    console.warn("Polling request timed out from client side, retrying...");
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
                    safeSetLocalStorage("lastUpdateId", updateId.toString());
                    if (!chatId || !text) {
                        console.log(`Skipping update ${updateId}: No chat ID or text message.`);
                        continue; 
                    }
                    if (text === "/start") {
                        const existingChatId = safeGetLocalStorage(LOCAL_STORAGE_CHAT_ID_KEY);
                        if (!existingChatId || existingChatId !== chatId.toString()) {
                            safeSetLocalStorage(LOCAL_STORAGE_CHAT_ID_KEY, chatId.toString());
                            console.log(`Chat ID ${chatId} stored successfully.`);
                        }
                        await sendTelegramMessageToUser(
                            chatId,
                            "👋 សូមស្វាគមន៍មកកាន់ហាងម្ហូបរបស់យើង!\n\n📌 សូមចុចប៊ូតុង \"Order\" ដើម្បីជ្រើសរើស និងកម្មង់ម្ហូបដែលអ្នកចង់ទទួលទាន។\n\n🙏 សូមអរគុណសម្រាប់ការគាំទ្រ!"
                        );
                    }
                }
            } else if (!data.ok) {
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    } catch (error) {
        console.error("⚠️ Critical error in polling loop. Restarting after delay:", error);
        isPollingActive = false; // Stop the current loop
        await new Promise(resolve => setTimeout(resolve, 10000)); 
        startTelegramPolling();
    }
}
startTelegramPolling();
function stopTelegramPolling() {
    isPollingActive = false;
}

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
  const storeItems = cart.filter(item => item.storeId === storeId);
  const remainingItems = cart.filter(item => item.storeId !== storeId);
  localStorage.setItem("cart", JSON.stringify(remainingItems));

  const storeName = storeItems[0]?.storeName || "Our Store";

  let message = `✅ Your order from <b>${storeName}</b> has been placed successfully!\n\n<b>Details:</b>\n`;
  storeItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} x ${item.quantity}\n`;
  });
  message += "\nThank you for your purchase!";

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
  await fetchAndStoreUserChatId(); // Only fetch user-linked chatId
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", handlePlaceOrder);
  } else {
    console.error("Element with ID 'placeOrderBtn' not found.");
  }
}

window.onload = initializeApp();


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
