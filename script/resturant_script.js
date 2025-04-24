document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Amazon: [
      {
        name: "Latte",
        description: "Espresso with steamed milk and a layer of foam, offering a creamy and .",
        price: "4.20",
        imgSrc: "./img/latte.jpg",
        link: "categoryPage.html?category=Latte",
        storeId: 'store123',


      },
      {
        name: "Cappuccino",
        description: "A coffee made with espresso, hot milk, and topped with foamed milk",
        price: "4.00",
        imgSrc: "./img/cappuccino.jpg",
        link: "categoryPage.html?category=Cappuccino",
        storeId: 'store123'
      },
      {
        name: "Flat White",
        description: "A strong espresso with steamed milk, similar to a latte but with less foam",
        price: "4.30",
        imgSrc: "./img/flat-white.jpg",
        link: "categoryPage.html?category=FlatWhite",
        storeId: 'store123'
      },
      {
        name: "Caramel Macchiato",
        description: "A sweet espresso drink with vanilla syrup, steamed milk, and a caramel drizzle.",
        price: "4.75",
        imgSrc: "./img/caramel-macchiato.jpg",
        link: "categoryPage.html?category=CaramelMacchiato",
        storeId: 'store123'
      },
      {
        name: "Black Coffee",
        description: "An espresso mixed with a small amount of warm milk, creating a balance between strong",
        price: "1.50",
        imgSrc: "./img/black-coffee.jpg",
        link: "categoryPage.html?category=Cortado",
        storeId: 'store123'
      },
      {
        name: "White Choc Macchiato",
        description: "A traditional coffee made by brewing finely  and sugar in a cezve.",
        price: "1.75",
        imgSrc: "./img/hoc-white.jpg",
        link: "categoryPage.html?category=TurkishCoffee",
        storeId: 'store123'
      },
      {
        name: "Light Matcha Latte",
        description: "Strong brewed coffee mixed with sweetened condensed milk and served ",
        price: "1.80",
        imgSrc: "./img/Matcha.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: 'store123'
      },
      {
        name: "Light Honey Black Tea",
        description: "Lightly sweet with mild honey flavors and no acidic tastes",
        price: "4.40",
        imgSrc: "./img/honey-black.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: 'store123'
      },
      {
        name: "Green Tea Latte",
        description: "Lightly sweet with mild honey flavors and no acidic tastes",
        price: "2.10",
        imgSrc: "./img/green-tea-latte.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: 'store123'
      },
      {
        name: "Red Bean Matchea Frappe",
        description: "For ref only: Sweet and creamy",
        price: "2.75",
        imgSrc: "./img/Bean-Matchea.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: 'store123'
      },
      {
        name: "Strawberry Frappe",
        description: "Lightly sweet with mild honey flavors and no acidic tastes",
        price: "4.40",
        imgSrc: "./img/Strawberry-Frappe.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: 'store123'
      },
      {
        name: "Mixed Berry Yogurt Smoothie",
        description: "Lightly sweet with mild honey flavors and no acidic tastes",
        price: "2.78",
        imgSrc: "./img/Berry-Yogurt.jpg",
        link: "categoryPage.html?category=VietnameseIcedCoffee",
        storeId: 'store123'
      }
    ],
    Burgers: [
      {
        name: "The classics for 3",
        description: "1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium ",
        price: "23.10",
        imgSrc: "./img/berger.png",
        alt: "Combo Meal Image",
        link: "categoryPage.html?category=Burgers",
      },
      {
        name: "Beef Burgers",
        description: "The classic burger made with ground beef. Variations include regular beef patties, ",
        price: "20.50",
        imgSrc: "./img/beef.jpg",
        alt: "Beef Burger Image",
        link: "categoryPage.html?category=BeefBurgers",

      },
      {
        name: "Chicken Burgers",
        description: "Made with a grilled or fried chicken patty, often topped with lettuce",
        price: "18.75",
        imgSrc: "./img/chicken.png",
        alt: "Chicken Burger Image",
        link: "categoryPage.html?category=ChickenBurgers",

      },
      {
        name: "Veggie Burgers",
        description: "A vegetarian option made with ingredients like beans, lentils, chickpeas, mushrooms",
        price: "19.20",
        imgSrc: "./img/veggie_burgers.jpg",
        alt: "Veggie Burger Image",
        link: "categoryPage.html?category=VeggieBurgers",

      },
      {
        name: "Fish Burgers",
        description: "A burger made with fish, such as a fried or grilled fish fillet .",
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
        description: "A beef burger topped with BBQ sauce, grilled onions, and sometimes bacon or cheese.",
        price: "22.50",
        imgSrc: "./img/bbq.jpg",
        alt: "BBQ Burger Image",
        link: "categoryPage.html?category=BBQBurgers",

      },
      {
        name: "Cheese Burgers",
        description: "A classic burger topped with cheese (American, cheddar, Swiss, etc.)",
        price: "20.00",
        imgSrc: "./img/chess.jpg",
        alt: "Cheese Burger Image",
        link: "categoryPage.html?category=CheeseBurgers",

      },
      {
        name: "Bacon Burgers",
        description: "A burger with crispy bacon, adding a smoky and crunchy flavor.",
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
        description: "A fully plant-based option made with ingredients like tofu, tempeh",
        price: "19.50",
        imgSrc: "./img/Vegan.jpg",
        alt: "Vegan Burger Image",
        link: "categoryPage.html?category=VeganBurgers",

      },
      {
        name: "Open-Faced Burgers",
        description: "Served without a top bun or with just one bun, often served like an open sandwich.",
        price: "22.10",
        imgSrc: "./img/Open-Faced.jpg",
        alt: "Open-Faced Burger Image",
        link: "categoryPage.html?category=OpenFacedBurgers",

      },
    ],
    Pizza: [
      {
        name: "Margherita",
        description: "Tomato sauce, fresh mozzarella, basil leaves, and olive oil.",
        price: "15.00",
        imgSrc: "./img/margherita-pizza.jpg",
        alt: "Margherita Pizza Image",
        link: "categoryPage.html?category=Margherita",

      },
      {
        name: "Pepperoni",
        description: "Tomato sauce, mozzarella, and slices of pepperoni.",
        price: "16.00",
        imgSrc: "./img/Pepperoni.png",
        alt: "Pepperoni Pizza Image",
        link: "categoryPage.html?category=Pepperoni",

      },
      {
        name: "Hawaiian",
        description: "Tomato sauce, mozzarella, ham, and pineapple.",
        price: "17.00",
        imgSrc: "./img/Hawaiian.jpg",
        alt: "Hawaiian Pizza Image",
        link: "categoryPage.html?category=Hawaiian",

      },
      {
        name: "Vegetarian",
        description: "Tomato sauce, mozzarella, and a variety of vegetables like bell peppers",
        price: "18.00",
        imgSrc: "./img/Vegetarian.jpg",
        alt: "Vegetarian Pizza Image",
        link: "categoryPage.html?category=Vegetarian",

      },
      {
        name: "BBQ Chicken",
        description: "BBQ sauce, mozzarella, grilled chicken, red onions, and cilantro.",
        price: "19.00",
        imgSrc: "./img/Chicken-pizza.png",
        alt: "BBQ Chicken Pizza Image",
        link: "categoryPage.html?category=BBQChicken",

      },
      {
        name: "Buffalo Chicken",
        description: "Buffalo sauce, mozzarella, grilled chicken, and blue cheese or ranch.",
        price: "19.50",
        imgSrc: "./img/Buffalo-Chicken.jpg",
        alt: "Buffalo Chicken Pizza Image",
        link: "categoryPage.html?category=BuffaloChicken",

      },
      {
        name: "Meat Lovers",
        description: "Tomato sauce, mozzarella, pepperoni, sausage, bacon, and ham.",
        price: "22.00",
        imgSrc: "./img/Meat-Lovers.jpg",
        alt: "Meat Lovers Pizza Image",
        link: "categoryPage.html?category=MeatLovers",

      },
      {
        name: "Seafood Pizza",
        description: "Mozzarella, tomato sauce, shrimp, calamari, mussels, and sometimes anchovies.",
        price: "23.00",
        imgSrc: "./img/Seafood-pizza.jpg",
        alt: "Seafood Pizza Image",
        link: "categoryPage.html?category=Seafood",

      },
      {
        name: "Truffle Mushroom",
        description: "Mozzarella, wild mushrooms, truffle oil, and sometimes arugula.",
        price: "25.00",
        imgSrc: "./img/Truffle-Mushroom.jpeg",
        alt: "Truffle Mushroom Pizza Image",
        link: "categoryPage.html?category=TruffleMushroom",

      },
      {
        name: "Prosciutto & Arugula",
        description: "Mozzarella, prosciutto, arugula, and parmesan.",
        price: "26.00",
        imgSrc: "./img/Prosciutto.jpg",
        alt: "Prosciutto & Arugula Pizza Image",
        link: "categoryPage.html?category=ProsciuttoArugula",

      }
    ]
  };
  const brands = {
    Amazon: [
      {
        type: 'Beverages, Tea & Coffee, Frappe & Smoothies',
        brand_name: 'Café Amazon (Kapal)',
        image: './img/amazon.jpg',
        description: 'Top restaurant',
        delivery: '$0.99 delivery',
        icon: 'fas fa-bicycle',
        address: '01, St.606, Boengkâk 2, Toul Kork, Phnom Penh'
      }
    ],
    Burgers: [
      {
        type: 'Burgers,Beverages,Western,Snacks,Chicken',
        brand_name: 'Burger King (BKK)',
        image: './img/bugerking.png',
        description: 'Top restaurant',
        delivery: '$0.99 delivery',
        icon: 'fas fa-bicycle',
        address: 'St.278,BKK1,Phnom Penh'
      }
    ],
    Pizza: [
      {
        type: 'Pizza,Beverages,Healthy Food,Western,Pasta',
        brand_name: 'The Pizza Company ',
        image: './img/pizzacompnay.png',
        description: 'Top restaurant',
        delivery: '$0.99 delivery',
        icon: 'fas fa-bicycle',
        address: 'Lot.5895, Hanoi Blvd, Phnom Penh Thmey, Phnom Penh'
      }
    ]
  };
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const storeId = urlParams.get('storeId');
  const brandTitle = document.getElementById('brand');
  const categoryDetails = document.getElementById('restaurantDetails');
  const openCageApiKey = '268a7e9e3ae94232ae797729b1a08c99';

  async function getCoordinatesFromAddress(address) {
    const coordsRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    if (coordsRegex.test(address)) {
      const [lat, lon] = address.split(',').map(Number);
      return { lat, lon };
    }
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${openCageApiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length) {
        return { lat: data.results[0].geometry.lat, lon: data.results[0].geometry.lng };
      }
      return null;
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }
  async function renderCards(lat, lng) {
    const cartSection = document.getElementById('cartSection');
    if (categories[category] && brands[category] && brands[category].length > 0) {
      let brandCards = '';
      for (const brand of brands[category]) {
        const brandCoords = await getCoordinatesFromAddress(brand.address);
        const distance = brandCoords ? calculateDistance(lat, lng, brandCoords.lat, brandCoords.lon) : 'N/A';

        const dynamicMapLink = `https://www.google.com/maps?q=${encodeURIComponent(brand.address)}`;

        const locationDisplay = `
          Location: ${brand.address || 'Not available'} 
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
      cartSection.style.display = '';
    } else {
      brandTitle.innerHTML = '';
      cartSection.style.display = 'none';
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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const storeId = localStorage.getItem("storeId");
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(storeId);  // Pass storeId to updateCartDisplay
  }
  function handleMinusClick(event) {
    const index = parseInt(event.target.dataset.index);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const storeId = localStorage.getItem("storeId");

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay(storeId);  // Pass storeId to updateCartDisplay
    }
  }
  function handleRemoveClick(event) {
    // Get the closest button element and its index
    const button = event.target.closest('.remove-btn');
    const index = parseInt(button.dataset.index);
    const itemDiv = button.closest(".d-flex"); // Get the cart item div
    itemDiv.classList.add("fade-out");
    setTimeout(() => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    }, 300); // Delay matches CSS animation time
  }

  let currentItem = null; 
  function addToCart(name, price, imgSrc) {
    currentItem = { name, price, imgSrc, storeId, sugar: null };
    document.getElementById('addToCartBtn').disabled = true;
    document.querySelectorAll('input[name="sugar"], input[name="pizza"]').forEach(input => input.checked = false);
    handleCategoryDisplay();
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalPrice').textContent = price.toFixed(2);
    // Show modal
    new bootstrap.Modal(document.getElementById('productModal')).show();
  }
  // Common function for sugar/pizza selection
  function setupSelectionInputs(inputName) {
    document.querySelectorAll(`input[name="${inputName}"]`).forEach(input => {
      input.addEventListener('change', () => {
        if (input.checked) {
          currentItem.sugar = input.value;
          document.getElementById('addToCartBtn').disabled = false;
          console.log('Sugar selected:', input.value);
        }
      });
    });
  }
  // Set up listeners for both sugar and pizza inputs
  ['sugar', 'pizza'].forEach(setupSelectionInputs);
  window.confirmAddToCart = function () {
    if (!currentItem) {
      console.error('No item to add to cart!');
      return;
    }
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === currentItem.name && item.storeId === currentItem.storeId && item.sugar === currentItem.sugar);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...currentItem,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();

    const modalEl = document.getElementById('productModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };
  function updateCartDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('storeId');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const filteredItems = cart.filter(item => item.storeId === storeId); // ✅ Filter by store

    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    const emptyCartMessage = document.querySelector(".empty-cart-content");

    cartItems.innerHTML = '';
    let total = 0;

    filteredItems.forEach((item, index) => {
      total += item.price * item.quantity;
      const itemDiv = document.createElement("div");
      itemDiv.className = "d-flex align-items-center border rounded p-2 mb-2 shadow-sm bg-white position-relative";
      itemDiv.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}" class="me-2 rounded" style="width: 60px; height: 60px; object-fit: cover;">
      <div class="flex-grow-1">
        <h6 class="mb-1 fw-semibold text-dark" style="font-size: 16px;">${item.name}</h6>
        <p class="text-muted mb-0" style="font-size: 15px; margin-right:60px">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="d-flex align-items-center" style="margin-top:30px">
        <button class="btn btn-sm btn-light border minus-btn" data-index="${index}">–</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="btn btn-sm btn-light border plus-btn" data-index="${index}">+</button>
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
    document.querySelectorAll(".plus-btn").forEach(btn => {
      btn.addEventListener("click", handlePlusClick);
    });
    document.querySelectorAll(".minus-btn").forEach(btn => {
      btn.addEventListener("click", handleMinusClick);
    });
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", handleRemoveClick);
    });
  }

  // Call on page load
  window.onload = updateCartDisplay


  if (categories[category]) {
    const cards = categories[category].map(item => `
      <div class="meal-card d-flex rounded-3 shadow p-3 bg-white">
        <div class="meal-info flex-grow-1 pe-3">
          <h6 class="fw-bold text-dark">${item.name}</h6>
          <p class="text-muted small mb-1 flex-grow-1">${item.description}</p>
          <p>form ${item.price} $</p>
        </div>
        <div class="meal-img position-relative">
          <img src="${item.imgSrc}" class="img-fluid meal-image">
          <button class="plus-icon border-0 position-absolute bottom-0 end-0  rounded-circle d-flex align-items-center justify-content-center"
            data-name="${item.name}" data-price="${item.price}" data-imgsrc="${item.imgSrc}"  data-store-id="${item.storeId}">
            <span class="fw-bold fs-5">+</span>
          </button>
        </div>
      </div>
    `).join('');
    categoryDetails.innerHTML = cards;
    updateCartDisplay();
  } else {
    categoryDetails.innerHTML = `<img src="./img/product_not_found.jpg" alt="No Products Available" class="img-fluids">`;
  }
  // Adding event listeners to buttons after content is loaded
  document.querySelectorAll('.plus-icon').forEach(button => {
    button.addEventListener('click', function () {
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      const imgSrc = this.getAttribute('data-imgsrc');

      addToCart(name, price, imgSrc);
    });
  });
  function handleCategoryDisplay() {
    const variationSection = document.getElementById('variationSection');
    const sugarSection = document.getElementById('sugarSection');
    if (category === 'Pizza') {
      variationSection.style.display = 'block';
      if (sugarSection) sugarSection.style.display = 'none';

    } else if (category === 'Amazon') {
      variationSection.style.display = 'none';
      if (sugarSection) sugarSection.style.display = 'block';
    } else {
      document.getElementById('addToCartBtn').disabled = false;
      variationSection.style.display = 'none';
      if (sugarSection) sugarSection.style.display = 'none';
    }
  }
  // Correct way to run on load:
  window.onload = handleCategoryDisplay;
});
