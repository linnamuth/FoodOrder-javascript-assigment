import { translations } from "./translations.js";
document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Amazon: [
      {
        price: "4.20",
        imgSrc: "./img/latte.jpg",
        link: "categoryPage.html?category=Latte",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "latte_name",
        i18nDescriptionKey: "latte_coffee_description",
      },
      {
        price: "4.00",
        imgSrc: "./img/cappuccino.jpg",
        link: "categoryPage.html?category=Cappuccino",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "cappuccino_name",
        i18nDescriptionKey: "cappuccino_coffee_description",
      },
      {
        price: "4.30",
        imgSrc: "./img/flat-white.jpg",
        link: "categoryPage.html?category=FlatWhite",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "flat_white_name",
        i18nDescriptionKey: "flat_white_coffee_description",
      },
      {
        name: "Caramel Macchiato",
        description:
          "A sweet espresso drink with vanilla syrup, steamed milk, and a caramel drizzle.",
        price: "4.75",
        imgSrc: "./img/caramel-macchiato.jpg",
        link: "categoryPage.html?category=CaramelMacchiato",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "caramel_macchiato_name",
        i18nDescriptionKey: "caramel_macchiato_coffee_description",
      },
      {
        price: "1.50",
        imgSrc: "./img/black-coffee.jpg",
        link: "categoryPage.html?category=Cortado",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "cortado_name",
        i18nDescriptionKey: "cortado_coffee_description",
      },
      {
        price: "1.75",
        imgSrc: "./img/hoc-white.jpg",
        link: "categoryPage.html?category=TurkishCoffee",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "white_choc_macchiato_name",
        i18nDescriptionKey: "white_choc_macchiato_coffee_description",
      },
      {
        price: "1.80",
        imgSrc: "./img/Matcha.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "matcha_name",
        i18nDescriptionKey: "matcha_description",
      },
      {
        price: "4.40",
        imgSrc: "./img/honey-black.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "honey_black_name",
        i18nDescriptionKey: "honey_black_coffee_description",
      },
      {
        price: "2.10",
        imgSrc: "./img/green-tea-latte.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "green_tea_latte_name",
        i18nDescriptionKey: "green_tea_latte_description",
      },
      {
        price: "2.75",
        imgSrc: "./img/Bean-Matchea.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
        },
        i18nNameKey: "latte_name",
        i18nDescriptionKey: "latte_coffee_description",
      },
    ],
    Burgers: [
      {
        price: "23.10",
        imgSrc: "./img/berger.png",
        alt: "Combo Meal Image",
        link: "categoryPage.html?category=Burgers",
        i18nNameKey: "burger_combo_name",
        i18nDescriptionKey: "burger_combo_description",
      },
      {
        name: "Beef Burgers",
        description:
          "The classic burger made with ground beef. Variations include regular beef patties, ",
        price: "20.50",
        imgSrc: "./img/beef.jpg",
        alt: "Beef Burger Image",
        link: "categoryPage.html?category=BeefBurgers",
        i18nNameKey: "burger_beef_name",
        i18nDescriptionKey: "burger_beef_description",
      },
      {
        price: "18.75",
        imgSrc: "./img/chicken.png",
        alt: "Chicken Burger Image",
        link: "categoryPage.html?category=ChickenBurgers",
        i18nNameKey: "burger_chicken_name",
        i18nDescriptionKey: "burger_chicken_description",
      },
      {
        price: "19.20",
        imgSrc: "./img/veggie_burgers.jpg",
        alt: "Veggie Burger Image",
        link: "categoryPage.html?category=VeggieBurgers",
        i18nNameKey: "burger_veggie_name",
        i18nDescriptionKey: "burger_veggie_description",
      },
      {
        price: "21.40",
        imgSrc: "./img/fish-buger.jpg",
        alt: "Fish Burger Image",
        link: "categoryPage.html?category=FishBurgers",
        i18nNameKey: "burger_fish_name",
        i18nDescriptionKey: "burger_fish_description",
      },
      {
        price: "20.80",
        imgSrc: "./img/turkey.jpg",
        alt: "Turkey Burger Image",
        link: "categoryPage.html?category=TurkeyBurgers",
        i18nNameKey: "burger_turkey_name",
        i18nDescriptionKey: "burger_turkey_description",
      },
      {
        price: "22.50",
        imgSrc: "./img/bbq.jpg",
        alt: "BBQ Burger Image",
        link: "categoryPage.html?category=BBQBurgers",
        i18nNameKey: "burger_bbq_name",
        i18nDescriptionKey: "burger_bbq_description",
      },
      {
        price: "20.00",
        imgSrc: "./img/chess.jpg",
        alt: "Cheese Burger Image",
        link: "categoryPage.html?category=CheeseBurgers",
        i18nNameKey: "burger_cheese_name",
        i18nDescriptionKey: "burger_cheese_description",
      },
      {
        price: "21.00",
        imgSrc: "./img/bacon.jpeg",
        alt: "Bacon Burger Image",
        link: "categoryPage.html?category=BaconBurgers",
        i18nNameKey: "burger_bacon_name",
        i18nDescriptionKey: "burger_bacon_description",
      },
      {
        price: "25.00",
        imgSrc: "./img/Gourmet.jpg",
        alt: "Gourmet Burger Image",
        link: "categoryPage.html?category=GourmetBurgers",
        i18nNameKey: "burger_gourmet_name",
        i18nDescriptionKey: "burger_gourmet_description",
      },
      {
        price: "19.50",
        imgSrc: "./img/Vegan.jpg",
        alt: "Vegan Burger Image",
        link: "categoryPage.html?category=VeganBurgers",
        i18nNameKey: "burger_vegan_name",
        i18nDescriptionKey: "burger_vegan_description",
      },
      {
        price: "22.10",
        imgSrc: "./img/Open-Faced.jpg",
        alt: "Open-Faced Burger Image",
        link: "categoryPage.html?category=OpenFacedBurgers",
        i18nNameKey: "burger_open_faced_name",
        i18nDescriptionKey: "burger_open_faced_description",
      },
    ],
    Pizza: [
      {
        price: "15.00",
        imgSrc: "./img/margherita-pizza.jpg",
        alt: "Margherita Pizza Image",
        link: "categoryPage.html?category=Margherita",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 15.0 },
          ],
        },
        i18nNameKey: "pizza_margherita_name",
        i18nDescriptionKey: "pizza_margherita_description",
      },
      {
        price: "16.00",
        imgSrc: "./img/Pepperoni.png",
        alt: "Pepperoni Pizza Image",
        link: "categoryPage.html?category=Pepperoni",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 16.0 },
          ],
        },
        i18nNameKey: "pizza_pepperoni_name",
        i18nDescriptionKey: "pizza_pepperoni_description",
      },
      {
        price: "17.00",
        imgSrc: "./img/Hawaiian.jpg",
        alt: "Hawaiian Pizza Image",
        link: "categoryPage.html?category=Hawaiian",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 17.0 },
          ],
        },
        i18nNameKey: "pizza_hawaiian_name",
        i18nDescriptionKey: "pizza_hawaiian_description",
      },
      {
        price: "18.00",
        imgSrc: "./img/Vegetarian.jpg",
        alt: "Vegetarian Pizza Image",
        link: "categoryPage.html?category=Vegetarian",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 18.0 },
          ],
        },
        i18nNameKey: "pizza_vegetarian_name",
        i18nDescriptionKey: "pizza_vegetarian_description",
      },
      {
        price: "19.00",
        imgSrc: "./img/Chicken-pizza.png",
        alt: "BBQ Chicken Pizza Image",
        link: "categoryPage.html?category=BBQChicken",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 19.0 },
          ],
        },
        i18nNameKey: "pizza_bbq_chicken_name",
        i18nDescriptionKey: "pizza_bbq_chicken_description",
      },
      {
        price: "19.50",
        imgSrc: "./img/Buffalo-Chicken.jpg",
        alt: "Buffalo Chicken Pizza Image",
        link: "categoryPage.html?category=BuffaloChicken",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 19.0 },
          ],
        },
        i18nNameKey: "pizza_buffalo_chicken_name",
        i18nDescriptionKey: "pizza_buffalo_chicken_description",
      },
      {
        price: "22.00",
        imgSrc: "./img/Meat-Lovers.jpg",
        alt: "Meat Lovers Pizza Image",
        link: "categoryPage.html?category=MeatLovers",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 22.0 },
          ],
        },
        i18nNameKey: "pizza_meat_lovers_name",
        i18nDescriptionKey: "pizza_meat_lovers_description",
      },
      {
        price: "23.00",
        imgSrc: "./img/Seafood-pizza.jpg",
        alt: "Seafood Pizza Image",
        link: "categoryPage.html?category=Seafood",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 23.0 },
          ],
        },
        i18nNameKey: "pizza_seafood_name",
        i18nDescriptionKey: "pizza_seafood_description",
      },
      {
        price: "25.00",
        imgSrc: "./img/Truffle-Mushroom.jpeg",
        alt: "Truffle Mushroom Pizza Image",
        link: "categoryPage.html?category=TruffleMushroom",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 25.0 },
          ],
        },
        i18nNameKey: "pizza_truffle_mushroom_name",
        i18nDescriptionKey: "pizza_truffle_mushroom_description",
      },
      {
        price: "26.00",
        imgSrc: "./img/Prosciutto.jpg",
        alt: "Prosciutto & Arugula Pizza Image",
        link: "categoryPage.html?category=ProsciuttoArugula",
        variations: {
          sizes: [
            { size: "Small", price: 7.0 },
            { size: "Medium", price: 10.0 },
            { size: "Large", price: 26.0 },
          ],
        },
        i18nNameKey: "pizza_prosciutto_arugula_name",
        i18nDescriptionKey: "pizza_prosciutto_arugula_description",
      },
    ],
  };
  const brands = {
    Amazon: [
      {
        type: "Beverages, Tea & Coffee, Frappe & Smoothies",
        brand_name: "Café Amazon (Kapal)",
        image: "./img/amazon.jpg",
        description: "Top restaurant",
        delivery: "$0.99 delivery",
        icon: "fas fa-bicycle",
        address: "01, St.606, Boengkâk 2, Toul Kork, Phnom Penh",
      },
    ],
    Burgers: [
      {
        type: "Burgers,Beverages,Western,Snacks,Chicken",
        brand_name: "Burger King (BKK)",
        image: "./img/bugerking.png",
        description: "Top restaurant",
        delivery: "$0.99 delivery",
        icon: "fas fa-bicycle",
        address: "St.278,BKK1,Phnom Penh",
      },
    ],
    Pizza: [
      {
        type: "Pizza,Beverages,Healthy Food,Western,Pasta",
        brand_name: "The Pizza Company ",
        image: "./img/pizzacompnay.png",
        description: "Top restaurant",
        delivery: "$0.99 delivery",
        icon: "fas fa-bicycle",
        address: "Lot.5895, Hanoi Blvd, Phnom Penh Thmey, Phnom Penh",
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
    if (window.currentCategory) {
      renderCategoryCards(category);
    }
  }
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const storeId = urlParams.get("storeId");
  const brandTitle = document.getElementById("brand");
  const categoryDetails = document.getElementById("restaurantDetails");
  async function renderCards() {
    const cartSection = document.getElementById("cartSection");
    if (
      !categories[category] ||
      !brands[category] ||
      brands[category].length === 0
    ) {
      brandTitle.innerHTML = "";
      cartSection.style.display = "none";
      return;
    }
    const brandPromises = brands[category].map(async (brand) => {
      const locationDisplay = `
     `;
      return `
      <div>
        <div class="row g-0">
          <div class="col-md-3 d-flex align-items-center justify-content-center p-3">
            <img src="${brand.image}" class="img-fluid rounded" alt="${brand.brand_name}">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <p class="text-muted mb-1">${brand.type}</p>
              <h5 class="card-title fw-bold">${brand.brand_name}</h5>
              <div class="d-flex align-items-center mb-2">
                <span class="badge bg-light text-dark me-2">${brand.description}</span>
                <span class="text-muted">
                  <i class="${brand.icon} me-1"></i> ${brand.delivery}
                </span>
              </div>
              ${locationDisplay}
            </div>
          </div>
        </div>
      </div>
    `;
    });
    const brandCards = await Promise.all(brandPromises);
    brandTitle.innerHTML = brandCards.join("");
    cartSection.style.display = "";
  }
  renderCards();
  function handlePlusClick(event) {
    const index = parseInt(event.target.dataset.index);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const storeId = localStorage.getItem("storeId");
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay(storeId); // Pass storeId to updateCartDisplay
  }
  function handleMinusClick(event) {
    const index = parseInt(event.target.dataset.index);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const storeId = localStorage.getItem("storeId");

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay(storeId); // Pass storeId to updateCartDisplay
    }
  }
  function handleRemoveClick(event) {
    const button = event.target.closest(".remove-btn");
    const index = parseInt(button.dataset.index);
    const itemDiv = button.closest(".d-flex");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    itemDiv.classList.add("fade-out");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setTimeout(() => {
      updateCartDisplay();
    }, 300);
  }

  let currentItem = null;
  let cartData = [];
  function addToCart(name, imgSrc, variations, index) {
    currentItem = {
      name,
      imgSrc,
      storeId,
      sugar: null,
      size: null,
      price: null,
    };
    if (typeof variations !== "object") {
      console.error("Variations is not an object:", variations);
      variations = {};
    }
    const productList = categories[category] || [];
    const product = productList[index];
    if (!product) {
      console.error(
        `No product found at index ${index} in category ${category}`
      );
      return;
    }
    document.getElementById("modalImage").src = product.imgSrc;
    document.getElementById("modalName").textContent = product.name;
    const sizeOptions = product.variations?.sizes || [];
    const defaultSizeObj =
      sizeOptions.find((v) => v.size === "Large") || sizeOptions[0];
    const defaultSize = defaultSizeObj ? defaultSizeObj.size : null;
    let defaultPrice = defaultSizeObj
      ? defaultSizeObj.price
      : parseFloat(product.price);
    if (isNaN(defaultPrice)) {
      console.error("Invalid price:", defaultPrice);
      defaultPrice = 0; // Fallback to a default value if the price is invalid
    }

    currentItem.size = defaultSize;
    currentItem.price = defaultPrice;
    cartData.push(currentItem);

    document.getElementById("modalPrice").textContent = `${defaultPrice.toFixed(
      2
    )}`;

    // Clear and build variation options
    const variationSection = document.getElementById("variationSection");
    variationSection.innerHTML = `
      <div class="d-flex justify-content-between">
        <h5 style="font-weight: 700;font-size: 16px;">Variation</h5>
        <span class="required-label">Required</span>
      </div>`;
    // Loop through sizes
    sizeOptions.forEach((sizeObj, index) => {
      const size = sizeObj.size;
      const price = sizeObj.price;
      const div = document.createElement("div");
      div.className = "d-flex align-items-start gap-2 mt-4";
      div.innerHTML = `
        <input type="radio" name="pizza" value="${size}" data-price="${price}" id="variation${index}" ${
        size === "Large" ? "checked" : ""
      }>
        <div class="d-flex justify-content-between w-100">
          <label for="variation${index}" class="mb-0">${size}</label>
          <p class="mb-0">${price.toFixed(2)}</p>
        </div>`;
      variationSection.appendChild(div);
    });

    handleCategoryDisplay();

    document.querySelectorAll('input[name="sugar"]').forEach((input) => {
      input.checked = false;
    });
    const defaultSugar = document.querySelector(
      'input[name="sugar"][value="100%"]'
    );
    if (defaultSugar) {
      defaultSugar.checked = true;
      currentItem.sugar = "100%";
    } else {
      currentItem.sugar = null;
    }
    document.getElementById("addToCartBtn").disabled = true;
    setTimeout(() => {
      document.querySelectorAll('input[name="pizza"]').forEach((input) => {
        input.addEventListener("change", function () {
          const selectedSize = this.value;
          const selectedPrice = parseFloat(this.getAttribute("data-price"));
          currentItem.size = selectedSize;
          currentItem.price = selectedPrice;
          document.getElementById(
            "modalPrice"
          ).textContent = `${selectedPrice.toFixed(2)}`;
          checkAddToCartEligibility();
        });
      });
      document.querySelectorAll('input[name="sugar"]').forEach((input) => {
        input.addEventListener("change", function () {
          currentItem.sugar = this.value;
          checkAddToCartEligibility();
        });
      });
      // Initial check
      checkAddToCartEligibility();
    });
    new bootstrap.Modal(document.getElementById("productModal")).show();
  }

  function checkAddToCartEligibility() {
    const addToCartBtn = document.getElementById("addToCartBtn");
    if (category === "Pizza") {
      addToCartBtn.disabled = !currentItem.size;
    } else if (category === "Amazon") {
      addToCartBtn.disabled = !(currentItem.size && currentItem.sugar);
    } else {
      addToCartBtn.disabled = false;
    }
  }
  function setupSelectionInputs(inputName) {
    document.querySelectorAll(`input[name="${inputName}"]`).forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          if (inputName === "pizza") {
            currentItem.size = input.value;
            currentItem.price = parseFloat(input.dataset.price);
          } else if (inputName === "sugar") {
            currentItem.sugar = input.value;
          }
          if (currentItem.size || currentItem.sugar) {
            document.getElementById("addToCartBtn").disabled = false; // Enable button
          }
          if (currentItem.price !== null) {
            document.getElementById(
              "modalPrice"
            ).textContent = `${currentItem.price.toFixed(2)}`;
          }
        } else {
          document.getElementById("addToCartBtn").disabled = true;
        }
      });
    });
  }
  ["sugar", "pizza"].forEach(setupSelectionInputs);
  window.confirmAddToCart = function () {
    if (!currentItem) {
      console.error("No item to add to cart!");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(
      (item) =>
        item.name === currentItem.name &&
        item.storeId === currentItem.storeId &&
        item.sugar === currentItem.sugar
    );

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...currentItem,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();

    const modalEl = document.getElementById("productModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };
  function updateCartDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get("storeId");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const filteredItems = cart.filter((item) => item.storeId === storeId); // ✅ Filter by store

    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    const emptyCartMessage = document.querySelector(".empty-cart-content");
    const reviewButton = document.querySelector(".review-button"); // 🔽 Add reference to the button

    cartItems.innerHTML = "";
    let total = 0;

    filteredItems.forEach((item, index) => {
      total += item.price * item.quantity;

      const itemDiv = document.createElement("div");
      itemDiv.className =
        "d-flex flex-column flex-md-row align-items-center border rounded p-3 mb-3 shadow-sm bg-light position-relative";

      itemDiv.innerHTML = `
      <div class="d-flex justify-content-center mb-3 mb-md-0">
        <img src="${item.imgSrc}" alt="${
        item.name
      }" class="me-3 rounded" style="width: 50px; height: 60px; object-fit: cover;">
      </div>
      <div class="flex-grow-1 d-flex flex-column justify-content-between w-100 text-start">
        <div class="d-flex justify-content-between">
          <h6 class="mb-1 text-dark" style="width: 150px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
            ${item.name}
          </h6>
          <p class="text-muted mb-0 fw-semibold" style="font-size: 16px;">
            ${(item.price * item.quantity).toFixed(2)} $
          </p>
        </div>
        <div class="d-flex align-items-center mt-2">
          <button class="btn btn-outline-secondary btn-sm minus-btn" data-index="${index}" aria-label="Decrease quantity">–</button>
          <span class="mx-3">${item.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm plus-btn" data-index="${index}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="btn btn-sm btn-link text-danger position-absolute top-0 end-0 remove-btn" data-index="${index}" aria-label="Remove item">
        <i class="fas fa-times"></i>
      </button>
    `;
      cartItems.appendChild(itemDiv);
    });

    totalAmount.textContent = total.toFixed(2);

    // Handling cart display when empty
    if (filteredItems.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = "block";
      if (cartItems) cartItems.style.display = "none";
      if (totalAmount) totalAmount.textContent = "0.00";
      if (reviewButton) reviewButton.disabled = true;
    } else {
      if (emptyCartMessage) emptyCartMessage.style.display = "none";
      if (cartItems) cartItems.style.display = "block";
      if (reviewButton) reviewButton.disabled = false;
    }
    // 🔁 Add event listeners for interactive buttons
    document.querySelectorAll(".plus-btn").forEach((btn) => {
      btn.addEventListener("click", handlePlusClick);
    });
    document.querySelectorAll(".minus-btn").forEach((btn) => {
      btn.addEventListener("click", handleMinusClick);
    });
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", handleRemoveClick);
    });
  }
  const reviewButton = document.getElementById("reviewBtn");
  reviewButton.addEventListener("click", function () {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const storeId = new URLSearchParams(window.location.search).get("storeId");

    if (loggedIn) {
      window.location.href = `detail-info.html?storeId=${storeId}`;
    } else {
      window.location.href = "login.html";
    }
  });
  window.addEventListener("load", function () {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    console.log(loggedIn);
    if (loggedIn) {
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
  });

  // Call on page load
  window.onload = updateCartDisplay;
  function renderCategoryCards(category) {
    window.currentCategory = category;
    const currentLang = localStorage.getItem("selectedLanguage") || "en";

    if (categories[category]) {
      const cards = categories[category]
        .map((item, index) => {
          const translatedName =
            translations[currentLang]?.[item.i18nNameKey] || item.name;
          const translatedDescription =
            translations[currentLang]?.[item.i18nDescriptionKey] ||
            item.description;

          return `
          <div class="meal-card d-flex rounded-3 shadow p-3 bg-white">
            <div class="meal-info flex-grow-1 pe-3">
              <h6 class="fw-bold text-dark">${translatedName}</h6>
              <p class="text-muted small mb-1 flex-grow-1">${translatedDescription}</p>
              <p>from ${item.price} $</p>
            </div>
            <div class="meal-img position-relative">
              <img src="${item.imgSrc}" class="img-fluid meal-image">
              <button class="plus-icon border-0 position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                data-name="${translatedName}" 
                data-price="${item.price}" 
                data-imgsrc="${item.imgSrc}"  
                data-store-id="${item.storeId}"   
                data-store-name="${item.storeName}"     
                data-variations='${JSON.stringify(item.variations || [])}'
                data-index="${index}">
                <span class="fw-bold fs-5">+</span>
              </button>
            </div>
          </div>
        `;
        })
        .join("");

      categoryDetails.innerHTML = cards;

      bindAddToCartEvents(); // ✅ ADD THIS

      updateCartDisplay();
    } else {
      categoryDetails.innerHTML = `<img src="./img/product_not_found.jpg" alt="No Products Available" class="img-fluids">`;
    }
  }

  renderCategoryCards(category);
  function bindAddToCartEvents() {
    const buttons = document.querySelectorAll(".plus-icon");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const name = this.getAttribute("data-name");
        const imgSrc = this.getAttribute("data-imgsrc");
        const variationsStr = this.getAttribute("data-variations");
        const index = this.getAttribute("data-index");
        let variations = [];

        try {
          variations = JSON.parse(variationsStr);
        } catch (e) {
          console.error("Invalid variations JSON:", variationsStr);
        }

        addToCart(name, imgSrc, variations, index);
      });
    });
  }

  function handleCategoryDisplay() {
    const variationSection = document.getElementById("variationSection");
    const sugarSection = document.getElementById("sugarSection");
    if (category === "Pizza") {
      variationSection.style.display = "block";
      if (sugarSection) sugarSection.style.display = "none";
    } else if (category === "Amazon") {
      variationSection.style.display = "block";
      if (sugarSection) sugarSection.style.display = "block";
    } else {
      document.getElementById("addToCartBtn").disabled = false;
      variationSection.style.display = "none";
      if (sugarSection) sugarSection.style.display = "none";
    }
  }
  // Correct way to run on load:
  window.onload = handleCategoryDisplay;
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
});
