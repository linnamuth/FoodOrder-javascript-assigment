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
const LOCAL_STORAGE_CHAT_ID_KEY = "telegramChatId";

let globalChatId = localStorage.getItem(LOCAL_STORAGE_CHAT_ID_KEY);

async function fetchAllChatIdsFromBot() {
  const url = `${TELEGRAM_API_BASE_URL}/getUpdates`;
  const LOCAL_STORAGE_CHAT_IDS_KEY = "telegramChatIds";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok && data.result.length > 0) {
      const chatIdsSet = new Set();

      data.result.forEach((update) => {
        const chatId = update?.message?.chat?.id;
        if (chatId) chatIdsSet.add(String(chatId));
      });

      const uniqueChatIds = Array.from(chatIdsSet);
      localStorage.setItem(
        LOCAL_STORAGE_CHAT_IDS_KEY,
        JSON.stringify(uniqueChatIds)
      );
      console.log("Collected chat IDs:", uniqueChatIds);
      return uniqueChatIds;
    }

    console.warn("No updates or invalid data.");
    return [];
  } catch (error) {
    console.error("Failed to fetch chat IDs:", error);
    return [];
  }
}

async function sendTelegramMessageToAll(message) {
  const chatIds = JSON.parse(localStorage.getItem("telegramChatIds")) || [];

  if (chatIds.length === 0) {
    console.warn("No chat IDs found to send message.");
    return false;
  }

  const results = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const url = `${TELEGRAM_API_BASE_URL}/sendMessage`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        });

        const data = await response.json();
        if (!data.ok) {
          throw new Error(`Telegram API error: ${data.description}`);
        }
        return data;
      } catch (error) {
        console.error(`Failed to send message to ${chatId}:`, error);
        return null;
      }
    })
  );

  const successfulSends = results.filter(
    (r) => r.status === "fulfilled" && r.value
  );
  return successfulSends.length > 0;
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

  const currentStoreId = cart[0]?.storeId;
  const storeCartItems = cart.filter((item) => item.storeId === currentStoreId);
  const remainingItems = cart.filter((item) => item.storeId !== currentStoreId);
  localStorage.setItem("cart", JSON.stringify(remainingItems));

  const currentStoreName = storeCartItems[0]?.storeName || "Unknown Store";

  let orderText = `✅ Your order from <b>${currentStoreName}</b> has been placed successfully!\n\n<b>Details:</b>\n`;
  storeCartItems.forEach((item, index) => {
    orderText += `${index + 1}. ${item.name} x ${item.quantity}\n`;
  });
  orderText += "\nThank you for your purchase!";

  // ✅ FIXED: use the correct function
  const messageSent = await sendTelegramMessageToAll(orderText);

  if (messageSent) {
    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been successfully submitted.",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Order Placed, but Notification Failed",
      text: "Your order was placed, but we couldn't send a notification to Telegram. Please check manually.",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "index.html";
    });
  }
}

async function initializeApp() {
  await fetchAllChatIdsFromBot(); // Get all users
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
