import { translations } from "./translations.js";

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
//   updateOrderSummary();
  renderOrderHistory();
}
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
// Function to render order history
function renderOrderHistory() {
  const username = localStorage.getItem("username");
  const container = document.getElementById("orderHistory");
  container.innerHTML = "";

  if (!username) {
    container.innerHTML = "<p>Please log in to see your orders.</p>";
    return;
  }

  const allOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || {};
  const userHistory = allOrderHistory[username] || [];

  if (userHistory.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  userHistory.reverse().forEach(order => {
    const div = document.createElement("div");
    div.className = "order-card";
    div.innerHTML = `
      <h4 style="color:#e6007e">Order #${order.id}</h4>
      <p><strong>Date:</strong> ${order.date}</p>
      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item" style="display: flex; align-items: center; margin-bottom: 5px;">
            <img src="${item.imgSrc}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;" />
            <div>
              <div><strong>${item.name}</strong> (${item.size})</div>
              <div>× ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    container.appendChild(div);
  });
}
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

