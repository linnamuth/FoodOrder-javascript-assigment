import { translations } from "./translations.js";
document.addEventListener("DOMContentLoaded", function () {
  let map;
  let currentMarker;

  function initializeMapWithLocation() {
    if ("geolocation" in navigator) {
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        showPosition,
        showError,
        geoOptions
      );
    } else {
      displayLocationError(
        "Geolocation is not supported by this browser. Please use a modern browser."
      );
      document.getElementById("map").style.display = "none";
      document.getElementById("current-address").textContent =
        "Geolocation not available.";
    }
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    if (map && map._leaflet_id) {
      map.setView([lat, lon], 15);
      if (currentMarker) {
        map.removeLayer(currentMarker);
      }
    } else {
      map = L.map("map").setView([lat, lon], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

        maxZoom: 19,
      }).addTo(map);
    }
    currentMarker = L.marker([lat, lon], { draggable: true })
      .addTo(map)
      .bindPopup("<b>You are here!</b><br>Fetching address...")
      .openPopup();

    currentMarker.on("dragend", function (event) {
      const marker = event.target;
      const position = marker.getLatLng();
      console.log(
        `Marker dragged to: Lat ${position.lat}, Lng ${position.lng}`
      );
      fetchAddressFromCoordinates(position.lat, position.lng);
      map.panTo(position);
    });

    fetchAddressFromCoordinates(lat, lon);
  }

  function showError(error) {
    let errorMessage = "Unable to retrieve your location.";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage =
          "Location access denied. Please enable location services in your browser settings.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMessage = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errorMessage = "An unknown error occurred while retrieving location.";
        break;
    }
    console.error(`Geolocation Error: ${errorMessage}`, error);
    displayLocationError(errorMessage);
  }

  function displayLocationError(message) {
    document.getElementById("current-address").textContent = message;
  }

  function fetchAddressFromCoordinates(lat, lon) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    fetch(geocodeUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        let addressText = "Unknown location";
        if (data && data.address) {
          const address = data.address;
          addressText = [
            address.road,
            address.house_number,
            address.suburb,
            address.city || address.town || address.village,
            address.state,
          ]
            .filter(Boolean)
            .join(", ");
        }

        document.getElementById("current-address").textContent = addressText;
        if (currentMarker) {
          currentMarker.setPopupContent(`<b>Location:</b><br>${addressText}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching the address:", error);
        document.getElementById("current-address").textContent =
          "Unable to fetch address. Please try again later.";
      });
  }

  initializeMapWithLocation();
});
function setLanguage(lang) {
  const languageSwitcher = document.getElementById("languageSwitcher");
  if (languageSwitcher) {
    languageSwitcher.value = lang;
  }
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  localStorage.setItem("selectedLanguage", lang);
  updateOrderSummary();
}
function updateOrderSummary() {
  const storeId = new URLSearchParams(window.location.search).get("storeId");

  if (!storeId) {
    console.error("No storeId found");
    return;
  }
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const storeCart = cart.filter((item) => item.storeId === storeId);
  const summaryContainer = document.getElementById("orderSummary");
  if (!summaryContainer) return;
  summaryContainer.innerHTML = "";
  let subtotal = 0;
  storeCart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    summaryContainer.innerHTML += `
      <div class="d-flex justify-content-between">
        <span>${item.quantity} × ${item.name}</span>
        <span>$ ${itemTotal.toFixed(2)}</span>
      </div>
    `;
  });
  const vat = +(subtotal * 0.01).toFixed(2);
  const total = subtotal + vat;

  summaryContainer.innerHTML += `
    <hr/>
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
    <hr/>
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
function safeSetLocalStorage(key, value) {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(key, value);
  } else {
    console.warn("localStorage not available. Using sessionStorage.");
    sessionStorage.setItem(key, value); // Fallback to sessionStorage
  }
}
function safeGetLocalStorage(key) {
  if (isLocalStorageAvailable()) {
    return localStorage.getItem(key);
  } else {
    console.warn("localStorage not available. Using sessionStorage.");
    return sessionStorage.getItem(key); // Fallback to sessionStorage
  }
}
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
startTelegramPolling();
async function handlePlaceOrder() {
  const storeId = new URLSearchParams(window.location.search).get("storeId");
  const username = localStorage.getItem("username"); // ✅ Get logged-in user

  if (!username) {
    Swal.fire({
      icon: "error",
      title: "User Not Logged In",
      text: "Please log in before placing an order.",
    });
    return;
  }

  const carts = JSON.parse(localStorage.getItem("cart")) || [];
  const storeCart = carts.filter((item) => item.storeId === storeId);

  if (storeCart.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Cart is Empty",
      text: "Please add some items before placing an order.",
    });
    return;
  }

  const remainingItems = carts.filter((item) => item.storeId !== storeId);
  localStorage.setItem("cart", JSON.stringify(remainingItems));

  // ✅ Save to Order History by User
  const allOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || {};
  const userOrderHistory = allOrderHistory[username] || [];

  const newOrder = {
    id: Date.now(),
    storeId: storeId,
    items: storeCart,
    date: new Date().toLocaleString(),
  };

  userOrderHistory.push(newOrder);
  allOrderHistory[username] = userOrderHistory;

  localStorage.setItem("orderHistory", JSON.stringify(allOrderHistory));

  // ✅ Prepare Telegram Message
  let message = `✅ ការបញ្ជាទិញបានបញ្ចប់ដោយជោគជ័យ!\n\n<b>ព័ត៌មានលម្អិត:</b>\n`;
  storeCart.forEach((item, index) => {
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


async function initializeApp() {
  await discardOldUpdates();
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
function initializePage() {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  setLanguage(savedLanguage);

  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginSignupLink").classList.add("d-none");
    document.getElementById("userIcon").classList.remove("d-none");

    const username = localStorage.getItem("username");
    if (username) {
      document.getElementById("userName").textContent = username;
    } else {
      console.error("Username is not set in localStorage.");
    }
  } else {
    document.getElementById("loginSignupLink").classList.remove("d-none");
    document.getElementById("userIcon").classList.add("d-none");
  }

  const languageSwitcher = document.getElementById("languageSwitcher");
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", function () {
      setLanguage(this.value);
    });
  } else {
    console.error("Language switcher element not found!");
  }
}

document.addEventListener("DOMContentLoaded", initializePage());

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  setLanguage(savedLanguage);
});
const languageSwitcher = document.getElementById("languageSwitcher");
if (languageSwitcher) {
  languageSwitcher.addEventListener("change", function () {
    setLanguage(this.value);
  });
}
