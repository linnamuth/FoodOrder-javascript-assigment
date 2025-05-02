document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Amazon: [
      {
        name: "Latte",
        description:
          "Espresso with steamed milk and a layer of foam, offering a creamy and smooth taste.",
        price: "4.20",
        imgSrc: "./img/latte.jpg",
        link: "categoryPage.html?category=Latte",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Skim", "Oat", "Almond", "Soy"], // No price change based on milk option
          sweetness: ["No Sugar", "Less Sugar", "Normal", "Extra Sweet"], // No price change based on sweetness
        },
      },
      {
        name: "Cappuccino",
        description:
          "A coffee made with espresso, hot milk, and topped with foamed milk.",
        price: "4.00",
        imgSrc: "./img/cappuccino.jpg",
        link: "categoryPage.html?category=Cappuccino",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Oat", "Soy"],
          sweetness: ["No Sugar", "Normal"],
        },
      },
      {
        name: "Flat White",
        description:
          "A strong espresso with steamed milk, similar to a latte but with less foam.",
        price: "4.30",
        imgSrc: "./img/flat-white.jpg",
        link: "categoryPage.html?category=FlatWhite",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Skim", "Oat", "Almond", "Soy"],
          sweetness: ["No Sugar", "Normal", "Extra Sweet"],
        },
      },
      {
        name: "Caramel Macchiato",
        description:
          "A sweet espresso drink with vanilla syrup, steamed milk, and a caramel drizzle.",
        price: "4.75",
        imgSrc: "./img/caramel-macchiato.jpg",
        link: "categoryPage.html?category=CaramelMacchiato",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Skim", "Oat", "Almond", "Soy"],
          sweetness: ["Less Sugar", "Normal", "Extra Sweet"],
        },
      },
      {
        name: "Black Coffee",
        description:
          "An espresso mixed with a small amount of warm milk, creating a balance between strong espresso flavor and mild milk.",
        price: "1.50",
        imgSrc: "./img/black-coffee.jpg",
        link: "categoryPage.html?category=Cortado",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Skim", "Oat", "Almond", "Soy"],
          sweetness: ["No Sugar", "Less Sugar", "Normal"],
        },
      },
      {
        name: "White Choc Macchiato",
        description:
          "A traditional coffee made by brewing finely ground beans, mixed with white chocolate syrup and steamed milk.",
        price: "1.75",
        imgSrc: "./img/hoc-white.jpg",
        link: "categoryPage.html?category=TurkishCoffee",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Skim", "Oat", "Almond", "Soy"],
          sweetness: ["Normal", "Extra Sweet"],
        },
      },
      {
        name: "Light Matcha Latte",
        description:
          "A refreshing, lightly sweetened green tea latte with matcha flavor.",
        price: "1.80",
        imgSrc: "./img/Matcha.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Oat", "Soy"],
          sweetness: ["No Sugar", "Normal", "Extra Sweet"],
        },
      },
      {
        name: "Light Honey Black Tea",
        description:
          "Lightly sweetened black tea with honey flavors, offering a smooth and mild taste.",
        price: "4.40",
        imgSrc: "./img/honey-black.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          sweetness: ["No Sugar", "Less Sugar", "Normal"],
        },
      },
      {
        name: "Green Tea Latte",
        description:
          "A blend of green tea with steamed milk and a touch of sweetness, creating a smooth, mellow flavor.",
        price: "2.10",
        imgSrc: "./img/green-tea-latte.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          milkOptions: ["Whole", "Oat", "Soy"],
          sweetness: ["Normal", "Extra Sweet"],
        },
      },
      {
        name: "Red Bean Matcha Frappe",
        description:
          "Sweet, creamy frappuccino with matcha flavor and red bean topping.",
        price: "2.75",
        imgSrc: "./img/Bean-Matchea.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: "store123",
        variations: {
          sizes: [
            { size: "Small", price: 3.5 },
            { size: "Medium", price: 4.2 },
            { size: "Large", price: 5.0 },
          ],
          sweetness: ["Normal", "Extra Sweet"],
          toppings: ["Red Bean", "None"],
        },
      },
    ],
    Burgers: [
      {
        name: "The classics for 3",
        description:
          "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium ",
        price: "23.10",
        imgSrc: "./img/berger.png",
        alt: "Combo Meal Image",
        link: "categoryPage.html?category=Burgers",
      },
      {
        name: "Beef Burgers",
        description:
          "The classic burger made with ground beef. Variations include regular beef patties, ",
        price: "20.50",
        imgSrc: "./img/beef.jpg",
        alt: "Beef Burger Image",
        link: "categoryPage.html?category=BeefBurgers",
      },
      {
        name: "Chicken Burgers",
        description:
          "Made with a grilled or fried chicken patty, often topped with lettuce",
        price: "18.75",
        imgSrc: "./img/chicken.png",
        alt: "Chicken Burger Image",
        link: "categoryPage.html?category=ChickenBurgers",
      },
      {
        name: "Veggie Burgers",
        description:
          "A vegetarian option made with ingredients like beans, lentils, chickpeas, mushrooms",
        price: "19.20",
        imgSrc: "./img/veggie_burgers.jpg",
        alt: "Veggie Burger Image",
        link: "categoryPage.html?category=VeggieBurgers",
      },
      {
        name: "Fish Burgers",
        description:
          "A burger made with fish, such as a fried or grilled fish fillet .",
        price: "21.40",
        imgSrc: "./img/fish-buger.jpg",
        alt: "Fish Burger Image",
        link: "categoryPage.html?category=FishBurgers",
      },
      {
        name: "Turkey Burgers",
        description: "A leaner alternative to beef, made with ground turkey ",
        price: "20.80",
        imgSrc: "./img/turkey.jpg",
        alt: "Turkey Burger Image",
        link: "categoryPage.html?category=TurkeyBurgers",
      },
      {
        name: "BBQ Burgers",
        description:
          "A beef burger topped with BBQ sauce, grilled onions, and sometimes bacon or cheese.",
        price: "22.50",
        imgSrc: "./img/bbq.jpg",
        alt: "BBQ Burger Image",
        link: "categoryPage.html?category=BBQBurgers",
      },
      {
        name: "Cheese Burgers",
        description:
          "A classic burger topped with cheese (American, cheddar, Swiss, etc.)",
        price: "20.00",
        imgSrc: "./img/chess.jpg",
        alt: "Cheese Burger Image",
        link: "categoryPage.html?category=CheeseBurgers",
      },
      {
        name: "Bacon Burgers",
        description:
          "A burger with crispy bacon, adding a smoky and crunchy flavor.",
        price: "21.00",
        imgSrc: "./img/bacon.jpeg",
        alt: "Bacon Burger Image",
        link: "categoryPage.html?category=BaconBurgers",
      },
      {
        name: "Gourmet Burgers",
        description: "Upscale burgers featuring ingredients like truffle oil, ",
        price: "25.00",
        imgSrc: "./img/Gourmet.jpg",
        alt: "Gourmet Burger Image",
        link: "categoryPage.html?category=GourmetBurgers",
      },
      {
        name: "Vegan Burgers",
        description:
          "A fully plant-based option made with ingredients like tofu, tempeh",
        price: "19.50",
        imgSrc: "./img/Vegan.jpg",
        alt: "Vegan Burger Image",
        link: "categoryPage.html?category=VeganBurgers",
      },
      {
        name: "Open-Faced Burgers",
        description:
          "Served without a top bun or with just one bun, often served like an open sandwich.",
        price: "22.10",
        imgSrc: "./img/Open-Faced.jpg",
        alt: "Open-Faced Burger Image",
        link: "categoryPage.html?category=OpenFacedBurgers",
      },
    ],
    Pizza: [
      {
        name: "Margherita",
        description:
          "Tomato sauce, fresh mozzarella, basil leaves, and olive oil.",
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
      },
      {
        name: "Pepperoni",
        description: "Tomato sauce, mozzarella, and slices of pepperoni.",
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
      },
      {
        name: "Hawaiian",
        description: "Tomato sauce, mozzarella, ham, and pineapple.",
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
      },
      {
        name: "Vegetarian",
        description:
          "Tomato sauce, mozzarella, and a variety of vegetables like bell peppers",
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
      },
      {
        name: "BBQ Chicken",
        description:
          "BBQ sauce, mozzarella, grilled chicken, red onions, and cilantro.",
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
      },
      {
        name: "Buffalo Chicken",
        description:
          "Buffalo sauce, mozzarella, grilled chicken, and blue cheese or ranch.",
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
      },
      {
        name: "Meat Lovers",
        description:
          "Tomato sauce, mozzarella, pepperoni, sausage, bacon, and ham.",
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
      },
      {
        name: "Seafood Pizza",
        description:
          "Mozzarella, tomato sauce, shrimp, calamari, mussels, and sometimes anchovies.",
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
      },
      {
        name: "Truffle Mushroom",
        description:
          "Mozzarella, wild mushrooms, truffle oil, and sometimes arugula.",
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
      },
      {
        name: "Prosciutto & Arugula",
        description: "Mozzarella, prosciutto, arugula, and parmesan.",
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
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const storeId = urlParams.get("storeId");
  const brandTitle = document.getElementById("brand");
  const categoryDetails = document.getElementById("restaurantDetails");
  const openCageApiKey = "268a7e9e3ae94232ae797729b1a08c99";

  async function getCoordinatesFromAddress(address) {
    const coordsRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    if (coordsRegex.test(address)) {
      const [lat, lon] = address.split(",").map(Number);
      return { lat, lon };
    }
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${openCageApiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length) {
        return {
          lat: data.results[0].geometry.lat,
          lon: data.results[0].geometry.lng,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }
  async function renderCards(lat, lng) {
    const cartSection = document.getElementById("cartSection");
    if (
      categories[category] &&
      brands[category] &&
      brands[category].length > 0
    ) {
      let brandCards = "";
      for (const brand of brands[category]) {
        const brandCoords = await getCoordinatesFromAddress(brand.address);
        const distance = brandCoords
          ? calculateDistance(lat, lng, brandCoords.lat, brandCoords.lon)
          : "N/A";

        const dynamicMapLink = `https://www.google.com/maps?q=${encodeURIComponent(
          brand.address
        )}`;

        const locationDisplay = `
          Location: ${brand.address || "Not available"} 
          <a href="${dynamicMapLink}" target="_blank" style="color:orange;">Open Maps</a>
          <br>Distance: ${distance.toFixed(1)} km`;

        brandCards += `
          <div>
            <div class="d-flex">
              <img src="${brand.image}" class="img-header">
              <div class="mt-4">
                <p class="ml-4 mb-0" style="color: gray;">${brand.type}</p>
                <h1 class="ml-4 font-weight-bold">${brand.brand_name}</h1>
                <div class="d-flex">
                  <button class="ml-4" style="border-radius: 30px; border: none; height: 30px;">
                    <p class="p-1" style="font-size: 12px;">${brand.description}</p>
                  </button>
                  <p class="ml-2 mt-1">
                    <i class="${brand.icon}" style="font-size: 16px; margin-right: 5px;"></i>
                    ${brand.delivery}
                  </p>
                </div>
              </div>
            </div>
            <p class="mt-2 text-muted">${locationDisplay}</p>
          </div>
        `;
      }
      brandTitle.innerHTML = brandCards;
      cartSection.style.display = "";
    } else {
      brandTitle.innerHTML = "";
      cartSection.style.display = "none";
    }
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        renderCards(lat, lng);
      },
      (error) => {
        console.warn("User denied location or there was an error.");
        renderCards(null, null, true);
      }
    );
  } else {
    console.warn("Geolocation not supported by this browser.");
    renderCards(null, null, true);
  }
  // Event handlers for plus, minus, and remove buttons
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
    // Get the closest button element and its index
    const button = event.target.closest(".remove-btn");
    const index = parseInt(button.dataset.index);
    const itemDiv = button.closest(".d-flex"); // Get the cart item div
    itemDiv.classList.add("fade-out");
    setTimeout(() => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
    }, 300); // Delay matches CSS animation time
  }

  let currentItem = null;
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
    // Populate modal
    const productList = categories[category] || [];
    const product = productList[index];
    if (!product) {
      console.error(
        `No product found at index ${index} in category ${category}`
      );
      return;
    }

    // Example of retrieving data for the modal
    document.getElementById("modalImage").src = product.imgSrc;
    document.getElementById("modalName").textContent = product.name;

    const sizeOptions = product.variations?.sizes || [];
    const defaultSizeObj =
      sizeOptions.find((v) => v.size === "Large") || sizeOptions[0];
    const defaultSize = defaultSizeObj ? defaultSizeObj.size : null;
    let defaultPrice = defaultSizeObj
      ? defaultSizeObj.price
      : parseFloat(product.price); // Ensure price is a number

    // Check if defaultPrice is a valid number
    if (isNaN(defaultPrice)) {
      console.error("Invalid price:", defaultPrice);
      defaultPrice = 0; // Fallback to a default value if the price is invalid
    }

    currentItem.size = defaultSize;
    currentItem.price = defaultPrice;
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

    const defaultSugar = document.querySelector(
      'input[name="sugar"][value="100%"]'
    );
    if (defaultSugar) {
      defaultSugar.checked = true;
      currentItem.sugar = "100%";
    }
    document.getElementById("addToCartBtn").disabled = true;
    // Set up listeners after dynamic inputs are rendered
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
  // Common function for sugar/pizza selection
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
  // Set up listeners for both sugar and pizza inputs
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

    cartItems.innerHTML = "";
    let total = 0;

    filteredItems.forEach((item, index) => {
      total += item.price * item.quantity;
      const itemDiv = document.createElement("div");
      itemDiv.className =
        "d-flex  border rounded p-2 mb-2 shadow-sm bg-white position-relative";
      itemDiv.innerHTML = `
      <img src="${item.imgSrc}" alt="${
        item.name
      }" class="me-2 rounded" style="width: 50px; height: 60px; object-fit: cover;">
       <div class="flex-grow-1 d-flex flex-column">
        <div class="d-block justify-content-between  w-100">
          <h6 class="mb-1 flex-start d-flex   fw-semibold text-dark" style="font-size: 16px;">
            ${item.name}
          </h6>
          <p class="text-muted flex-start d-flex  fw-semibold mb-0 mr-4" style="font-size: 16px;">
            ${(item.price * item.quantity).toFixed(2)} $
          </p>
        </div>
      </div>

      <div class="d-flex " style="margin-top:30px">
        <button class="btn btn-sm btn-light border " data-index="${index}">–</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-light border" data-index="${index}">+</button>
      </div>
      <button class="btn btn-sm btn-link text-danger remove-btn" data-index="${index}" style="position: absolute; top: 5px; right: 5px;">
        <i class="fas fa-times"></i>
      </button>
    `;
      cartItems.appendChild(itemDiv);
    });

    totalAmount.textContent = total.toFixed(2);

    if (filteredItems.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = "block";
      if (cartItems) cartItems.style.display = "none";
      if (totalAmount) totalAmount.textContent = "0.00";
    } else {
      if (emptyCartMessage) emptyCartMessage.style.display = "none";
      if (cartItems) cartItems.style.display = "block";
    }
    // 🔁 Add event listeners for +/-/remove
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

  // Call on page load
  window.onload = updateCartDisplay;
  if (categories[category]) {
    const cards = categories[category]
      .map(
        (item, index) => `
        <div class="meal-card d-flex rounded-3 shadow p-3 bg-white">
          <div class="meal-info flex-grow-1 pe-3">
            <h6 class="fw-bold text-dark">${item.name}</h6>
            <p class="text-muted small mb-1 flex-grow-1">${item.description}</p>
            <p>from ${item.price} $</p>
          </div>
          <div class="meal-img position-relative">
            <img src="${item.imgSrc}" class="img-fluid meal-image">
            <button class="plus-icon border-0 position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
              data-name="${item.name}" 
              data-price="${item.price}" 
              data-imgsrc="${item.imgSrc}"  
              data-store-id="${item.storeId}"    
              data-variations='${JSON.stringify(item.variations || [])}'
              data-index="${index}">
              <span class="fw-bold fs-5">+</span>
            </button>
          </div>
        </div>
      `
      )
      .join("");

    categoryDetails.innerHTML = cards;
    updateCartDisplay();
  } else {
    categoryDetails.innerHTML = `<img src="./img/product_not_found.jpg" alt="No Products Available" class="img-fluids">`;
  }
  // Adding event listeners to buttons after content is loaded
  document.querySelectorAll(".plus-icon").forEach((button) => {
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
});
