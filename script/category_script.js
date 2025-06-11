import { translations } from "./translations.js";

document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Burgers: [
      {
        name: "Burger King (BKK)",
        imgSrc: "./img/bugerking.png",
        description: "$$ Burgers",
        link: "resturantPage.html?category=Burgers&storeId=123",
      },
      {
        name: "Belly Burger (Street 2004)",
        imgSrc: "./img/belly-buger.jpg",
        description: "$$ Burgers",
        link: "resturantPage.html?category=pizza&storeId=124",
      },
      {
        name: "Luck Burger",
        imgSrc: "./img/luck-buger.jpg",
        description: "$$ Burgers",
        link: "resturantPage.html?category=Burger&storeId=125",
      },
    ],
  };
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
    // renderOrderHistory();
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

document.getElementById("logoutLink")?.addEventListener("click", (event) => {
  logout(event); 
});

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const categoryDetails = document.getElementById("categoryDetails");
  if (categories[category]) {
    const cards = categories[category]
      .map(
        (item) => `
      <a href="${item.link}" class="text-decoration-none">
        <div class="rounded-3 shadow bg-white">
          <img src="${item.imgSrc}" class="img-fluid img-store" alt="${item.name}">
          <div class="p-2 mb-0">
            <h2 style="font-size:16px; color:black" class="fw-bold">${item.name}</h2>
            <p style="font-size:13px; color:grey">${item.description}</p>
          </div>
        </div>
      </a>
    `
      )
      .join("");
    categoryDetails.innerHTML = cards;
  } else {
    categoryDetails.innerHTML = `<img src="./img/product_not_found.jpg" alt="No Products Available" class="img-fluids">`;
  }
});
