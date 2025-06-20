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
  //   renderOrderHistory();
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
