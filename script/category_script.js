import { translations } from "./translations.js";

document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Burgers: [
      {
        name: "Burger King (BKK)",
        imgSrc: "./img/bugerking.png",
        description: "$$ Burgers",
        link: "resturantPage.html?category=Burgers&storeId=123",
        time: "30-40 min",
      },
    ],
    Pizza: [
      {
        name: "Pizza Company (BKK)",
        imgSrc: "./img/pizzacompnay.png",
        description: "$$ Pizza",
        link: "resturantPage.html?category=Pizza&storeId=456",
        time: "20-30 min",
      },
    ],
    Amazon: [
      {
        name: "Amazon Coffee",
        imgSrc: "./img/amazon.jpg",
        description: "$$ Drinks",
        link: "resturantPage.html?category=Amazon&storeId=456",
        time: "10-20 min",
      },
    ],
    noodle: [
      {
        name: "Noodle",
        imgSrc: "./img/mihel.png",
        description: "$$ noodle",
        link: "resturantPage.html?category=noodle&storeId=456",
        time: "20-30 min",
      },
    ],
    meetball: [
      {
        name: "Meetball",
        imgSrc: "./img/brhet.png",
        description: "$$ Meetballs",
        link: "resturantPage.html?category=meetball&storeId=300",
        time: "20-30 min",
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
      <a href="${item.link}" class="col-12 col-md-6 col-lg-4 mb-3">
        <div class="rounded-3 shadow bg-white">
          <img src="${item.imgSrc}" class="img-fluid img-store" alt="${item.name}">
          <div class="p-2 mb-0">
            <h2 style="font-size:16px; color:black" class="fw-bold">${item.name}</h2>
            <div class="d-flex justify-content-between align-items-center">
                <p style="font-size:15px; color:grey">${item.description}</p>
             <p style="font-size:16px; color:grey">${item.time}</p>
            </div>
        
          </div>
        </div>
      </a>
    `
      )
      .join("");
    categoryDetails.innerHTML = cards;
  } else {
    categoryDetails.innerHTML = `<div class="empty-state-message">
      <img src="./img/empty.png" alt="No Products Available" class="img-fluid empty-state-image">
      <h2>No Products Available</h2>
      <p>It looks like there are no products in this category yet.</p>
      <p>Please check back later or explore other categories.</p>
    </div>`;
  }
});
