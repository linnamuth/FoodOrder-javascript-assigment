const categories = [
  {
    name: "Pizza",
    imgSrc: "./img/pizza.png",
    alt: "Pizza",
    restaurants: 3,
    link: "categoryPage.html?category=Pizza",
  },
  {
    name: "Burgers",
    imgSrc: "./img/berger.png",
    alt: "Burgers & Fast Food",
    restaurants: 21,
    link: "categoryPage.html?category=Burgers",
  },
  {
    name: "Salads",
    imgSrc: "./img/source.png",
    alt: "Salads",
    restaurants: 31,
    link: "categoryPage.html?category=Salads",
  },
  {
    name: "Pasta & Casuals",
    imgSrc: "./img/pasta.png",
    alt: "Pasta & Casuals",
    restaurants: 4,
    link: "categoryPage.html?category=Pasta&Casuals",
  },
  {
    name: "Breakfast",
    imgSrc: "./img/breakfast.png",
    alt: "Breakfast",
    restaurants: 11,
    link: "categoryPage.html?category=Breakfast",
  },
  {
    name: "Soups",
    imgSrc: "./img/soup.png",
    alt: "Soups",
    restaurants: 22,
    link: "categoryPage.html?category=Soups",
  },
];

const restaurants = [
  {
    name: "Amazon Coffee",
    imgSrc: "./img/amazon.jpg",
    alt: "Amazon Coffee",
    link: "resturantPage.html?category=Amazon&storeId=101",
    storeId: "101",
    storeName: "Café Amazon (Kapal)",
  },
  {
    name: "Koi Coffee",
    imgSrc: "./img/Koi-logo.jpg",
    alt: "Koi Coffee",
    link: "resturantPage.html?category=Salads&storeId=102",
    storeId: "102",
  },
  {
    name: "KFC",
    imgSrc: "./img/kfc.png",
    alt: "KFC",
    link: "resturantPage.html?category=Pasta&storeId=103",
    storeId: "103",
  },
  {
    name: "Pizza Company",
    imgSrc: "./img/pizzacompnay.png",
    alt: "Pizza Company",
    link: "resturantPage.html?category=Pizza&storeId=104",
    storeId: "104",
  },
  {
    name: "Domino Pizza",
    imgSrc: "./img/domino.png",
    alt: "Domino Pizza",
    link: "resturantPage.html?category=Breakfast&storeId=105",
    storeId: "105",
  },
  {
    name: "Burger King",
    imgSrc: "./img/bugerking.png",
    alt: "Burger King",
    link: "resturantPage.html?category=Burgers&storeId=106",
    storeId: "106",
  },
];

// Create the restaurant cards
function createCards(data, containerId, isCategory = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = data
    .map((item) => `
      <div class="col-6 col-md-${isCategory ? "4 col-lg-2" : "2"} mb-4">
        <div class="${isCategory ? "category-card" : "restaurant-card"} h-100">
          <a href="${item.link}" class="text-decoration-none">
            <div class="image-container position-relative">
              <img src="${item.imgSrc}" class="overlay-img img-fluid rounded" alt="${item.alt}" />
              <div class="ms-3 mt-2">
                <h6 class="fw-bold ${isCategory ? "text-dark" : "text-white"}">${item.name}</h6>
                ${
                  isCategory
                    ? `<p class="mb-0" style="color: #fc8a06">${item.restaurants} Restaurants</p>`
                    : ""
                }
              </div>
            </div>
          </a>
        </div>
      </div>
    `)
    .join("");
}

createCards(categories, "category-container", true);
createCards(restaurants, "resturant-container");

window.onload = function () {
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
};

// Show logout and clear user info
function showLogout() {
  // Set isLoggedIn to false and clear any other session data
  localStorage.setItem("isLoggedIn", "false"); 
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");

  // Hide the user icon and show the login/signup link
  document.getElementById("userIcon").classList.add("d-none");  // Hide user icon
  document.getElementById("loginSignupLink").classList.remove("d-none");  // Show login/signup link

  // Redirect to the login page
  window.location.href = "login.html";
}
