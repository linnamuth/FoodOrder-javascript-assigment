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
    <small >incl. fees and tax</small>
  `;
}


async function handlePlaceOrder() {
  const storeId = new URLSearchParams(window.location.search).get("storeId");
  const username = localStorage.getItem("username");

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

  // Check selected delivery option
  const selectedDelivery = document.querySelector('input[name="deliveryOption"]:checked')?.value;
  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value;

  if (!selectedDelivery || !selectedPayment) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Selection",
      text: "Please select both delivery option and payment method.",
    });
    return;
  }

  // Save to Order History by User
  const allOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || {};
  const userOrderHistory = allOrderHistory[username] || [];

  const newOrder = {
    id: Date.now(),
    storeId: storeId,
    items: storeCart,
    deliveryMethod: selectedDelivery,
    paymentMethod: selectedPayment,
    date: new Date().toLocaleString(),
  };

  userOrderHistory.push(newOrder);
  allOrderHistory[username] = userOrderHistory;
  localStorage.setItem("orderHistory", JSON.stringify(allOrderHistory));

  // Optional: clear the cart for this store
  const updatedCart = carts.filter(item => item.storeId !== storeId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Show success message then redirect
  await Swal.fire({
    icon: "success",
    title: "Order Placed!",
    text: "Your order has been successfully placed.",
    timer: 1500,
    showConfirmButton: false
  });

  window.location.href = "payment.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  placeOrderBtn.addEventListener("click", handlePlaceOrder);
});


// window.onload = initializeApp;
function logout(event) {
  event.preventDefault();

  localStorage.removeItem("username");
  localStorage.removeItem("loggedIn");

  document.getElementById("userIcon").classList.add("d-none");
  document.getElementById("loginSignupLink").classList.remove("d-none");

  window.location.href = "login.html";
}
document.getElementById("logoutLink")?.addEventListener("click", (event) => {
  logout(event);
});

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
