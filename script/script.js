import { translations } from "./translations.js";

const categories = [
  {
    imgSrc: "./img/pizza.png",
    alt: "Pizza",
    restaurants: 3,
    link: "categoryPage.html?category=Pizza",
    i18nKey: "category_pizza", // Add a unique i18n key for translation
  },
  {
    imgSrc: "./img/buger.png",
    alt: "Burgers & Fast Food",
    restaurants: 21,
    link: "categoryPage.html?category=Burgers",
    i18nKey: "category_burgers",
  },
  {
    imgSrc: "./img/rice.png",
    alt: "Salads",
    restaurants: 31,
    link: "categoryPage.html?category=Salads",
    i18nKey: "category_rice",
  },
  {
    name: "Pasta & Casuals",
    imgSrc: "./img/mihel1.png",
    alt: "Pasta & Casuals",
    restaurants: 4,
    link: "categoryPage.html?category=noodle",
    i18nKey: "khmer_noodle_seoul",
  },
  {
    imgSrc: "./img/drink.png",
    alt: "Breakfast",
    restaurants: 11,
    link: "categoryPage.html?category=Amazon",
    i18nKey: "category_drink",
  },
  {
    imgSrc: "./img/brhet1.png",
    alt: "Soups",
    restaurants: 22,
    link: "categoryPage.html?category=meetball",
    i18nKey: "category_brhet",
  },
];
const restaurants = [
  {
    name: "Amazon Coffee",
    imgSrc: "./img/amazon.jpg",
    alt: "Amazon Coffee",
    link: "resturantPage.html?category=Amazon&storeId=101",
    storeId: "101",
    i18nKey: "restaurant_amazon_coffee",
  },
  {
    name: "Pizza Company",
    imgSrc: "./img/pizzacompnay.png",
    alt: "Pizza Company",
    link: "resturantPage.html?category=Pizza&storeId=104",
    storeId: "104",
    i18nKey: "restaurant_pizza_company",
  },
  {
    name: "Burger King",
    imgSrc: "./img/bugerking.png",
    alt: "Burger King",
    link: "resturantPage.html?category=Burgers&storeId=106",
    storeId: "106",
    i18nKey: "restaurant_burger_king",
  },
  {
    name: "Rice and Rice Fried Rice (Street 125)",
    imgSrc: "./img/bay_cha.png",
    alt: "Salads",
    link: "resturantPage.html?category=Breakfast&storeId=107",
    storeId: "107",
    i18nKey: "restaurant_rice_fried_rice",
  },
  {
    name: "Let's eat (Street 1015)",
    imgSrc: "./img/eat.png",
    alt: "Pasta & Casuals",
    link: "resturantPage.html?category=Breakfast&storeId=108",
    storeId: "108",
    i18nKey: "restaurant_lets_eat",
  },
  {
    name: "Delicious Noodles, Toul Tom Pong Branch 1 (Street 167)",
    imgSrc: "./img/khmer_noodle.png",
    alt: "Pasta & Casuals",
    link: "resturantPage.html?category=Breakfast&storeId=111",
    storeId: "111",
    i18nKey: "restaurant_delicious_noodles",
  },
  {
    name: "Sok Chheng Turkish Bread (Vanda)",
    imgSrc: "./img/nom.png",
    alt: "Pasta & Casuals",
    link: "resturantPage.html?category=Breakfast&storeId=113",
    storeId: "113",
    i18nKey: "restaurant_sok_chheng_bread",
  },
  {
    name: "Kimmo Korean Miher 7th Street (Central Market)",
    imgSrc: "./img/mihel.png",
    alt: "Pasta & Casuals",
    link: "resturantPage.html?category=noodle&storeId=114",
    storeId: "114",
    i18nKey: "restaurant_kimmo_korean_miher",
  },
  {
    name: "Rina Micha Guarantee (Santhormok)",
    imgSrc: "./img/micha.png",
    alt: "Pasta & Casuals",
    link: "resturantPage.html?category=Breakfast&storeId=115",
    storeId: "115",
    i18nKey: "restaurant_rina_micha",
  },
  {
    name: "I Win (Street 287)",
    imgSrc: "./img/nom_2.png",
    alt: "Pasta & Casuals",
    link: "resturantPage.html?category=Breakfast&storeId=116",
    storeId: "116",
    i18nKey: "restaurant_i_win",
  },
];
const DiscountRestaurants = [
  {
    name: "Hainanese Fried Chicken Rice, O Russey (Street 125)",
    imgSrc: "./img/brhet.png",
    alt: "Tiramisu Factory",
    link: "resturantPage.html?category=meetball&storeId=300",
    discount: "Discount 20%",
    i18nKey: "discount_hainanese_chicken_rice_2",
  },
  {
    name: "Wright Express (Boeung Keng Kang III)",
    imgSrc: "./img/fish.png",
    alt: "Tiramisu Factory",
    link: "resturantPage.html?storeId=204",
    discount: "Discount 30%",
    i18nKey: "discount_wright_express",
  },
  {
    name: "Chip Charlie (Toul Tom Pong)",
    imgSrc: "./img/discount_1.png",
    alt: "Tiramisu Factory",
    link: "resturantPage.html?storeId=204",
    discount: "Discount 50%",
    i18nKey: "discount_chip_charlie",
  },
  {
    name: "Hainanese Fried Chicken Rice, O Russey (Street 125)",
    imgSrc: "./img/food_1.png",
    alt: "Tiramisu Factory",
    link: "resturantPage.html?category=chickenrice&storeId=400",
    discount: "Discount 40%",
    i18nKey: "discount_hainanese_chicken_rice_1",
  },
  
  {
    name: "Josie Mercy (Boeung Keng Kang I)",
    imgSrc: "./img/food_2.png",
    alt: "Tiramisu Factory",
    link: "resturantPage.html?storeId=204",
    discount: "Discount 40%",
    i18nKey: "discount_josie_mercy",
  },
  {
    name: "The Enchanted Chocolate (Boeng Salaang)",
    imgSrc: "./img/food_5.png",
    alt: "Tiramisu Factory",
    link: "resturantPage.html?storeId=204",
    discount: "Discount 20%",
    i18nKey: "discount_enchanted_chocolate",
  },
  {
    name: "Fresh fruit juice and fruit shakes (Boeung Keng Kang I)",
    imgSrc: "./img/food_6.png",
    alt: "Tiramisu Factory",
    link: "resturantPage.html?category=drink&storeId=500",
    discount: "Discount 20%",
    i18nKey: "discount_fresh_fruit_juice",
  },
];
function setLanguage(lang) {
  const languageSwitcher = document.getElementById("languageSwitcher");
  if (languageSwitcher) {
    languageSwitcher.value = lang;
  }
  // Update static text elements
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  // Update restaurant counts
  document.querySelectorAll(".restaurants-count-text").forEach((element) => {
    const count = element.getAttribute("data-restaurants-count");
    if (
      count &&
      translations[lang] &&
      translations[lang]["restaurants_count"]
    ) {
      element.textContent = `${count} ${translations[lang]["restaurants_count"]}`;
    }
  });

  // Re-render dynamic content
  createCards(categories, "category-container", true);
  createCards(restaurants, "resturant-container");
  createCards(DiscountRestaurants, "discount-container");
  localStorage.setItem("selectedLanguage", lang);
}

function createCards(data, containerId, isCategory = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentLang = localStorage.getItem("selectedLanguage") || "en";

  container.innerHTML = data
    .map((item) => {
      const displayName =
        translations[currentLang] && translations[currentLang][item.i18nKey]
          ? translations[currentLang][item.i18nKey]
          : item.name;

      return `
        <div class="col-6 col-md-${isCategory ? "4 col-lg-2" : "2"} mb-4">
          <div class="${
            isCategory ? "category-card" : "restaurant-card"
          } h-100">
            <a href="${item.link}" class="text-decoration-none">
              <div class="image-container position-relative">
                <img src="${
                  item.imgSrc
                }" class="overlay-img img-fluid rounded" alt="${item.alt}" />
                ${
                  !isCategory && item.discount
                    ? `<div class="discount-badge position-absolute top-0 start-0 m-2 px-2 py-1 rounded-pill text-white fw-bold" style="background-color: #e6007e; font-size: 0.75rem;">
                        <i class="bi bi-tag-fill"></i> ${item.discount}
                      </div>`
                    : ""
                }
             <div class="ms-3 mt-2">
              <h6 class="fw-bold">${displayName}</h6>
              ${
                isCategory
                  ? `<p class="mb-0 restaurants-count-text" style="color: #e21b70" data-restaurants-count="${item.restaurants}">${item.restaurants} ${translations[currentLang]["restaurants_count"]}</p>`
                  : ""
              }
              </div>
              </div>
            </a>
          </div>
        </div>
      `;
    })
    .join("");
}

function initializePage() {
  createCards(categories, "category-container", true);
  createCards(restaurants, "resturant-container");
  createCards(DiscountRestaurants, "discount-container");
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

document.addEventListener("DOMContentLoaded", initializePage);

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
