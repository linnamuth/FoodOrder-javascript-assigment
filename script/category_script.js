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
      }
    ]
  };

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');    
  const categoryDetails = document.getElementById('categoryDetails');
  if (categories[category]) {
    const cards = categories[category].map(item => `
      <a href="${item.link}" class="text-decoration-none">
        <div class="rounded-3 shadow bg-white">
          <img src="${item.imgSrc}" class="img-fluid img-store" alt="${item.name}">
          <div class="p-2 mb-0">
            <h2 style="font-size:16px; color:black" class="fw-bold">${item.name}</h2>
            <p style="font-size:13px; color:grey">${item.description}</p>
          </div>
        </div>
      </a>
    `).join('');
    categoryDetails.innerHTML = cards;
  } else {
    categoryDetails.innerHTML = `<img src="./img/product_not_found.jpg" alt="No Products Available" class="img-fluids">`;
  }
});



  
    // Salads: [
    //   {
    //     name: "Caesar Salad",
    //     description: "Classic Caesar with romaine lettuce, croutons, parmesan cheese, and Caesar dressing.",
    //     price: "12.50",
    //     imgSrc: "./img/Caesar-salad.jpg",
    //     alt: "Caesar Salad Image",
    //     link: "categoryPage.html?category=CaesarSalad"
    //   },
    //   {
    //     name: "Greek Salad",
    //     description: "A mix of cucumbers, tomatoes, olives, feta cheese, red onions, and a light vinaigrette dressing.",
    //     price: "13.20",
    //     imgSrc: "./img/Greek-Salad.png",
    //     alt: "Greek Salad Image",
    //     link: "categoryPage.html?category=GreekSalad"
    //   },
    //   {
    //     name: "Cobb Salad",
    //     description: "A hearty salad with grilled chicken, bacon, avocado, hard-boiled eggs, blue cheese, and dressing.",
    //     price: "14.00",
    //     imgSrc: "./img/Cobb-Salad.jpg",
    //     alt: "Cobb Salad Image",
    //     link: "categoryPage.html?category=CobbSalad"
    //   },
    //   {
    //     name: "Garden Salad",
    //     description: "Fresh mixed greens with tomatoes, cucumbers, carrots, and choice of dressing.",
    //     price: "10.50",
    //     imgSrc: "./img/Garden-Salad.jpg",
    //     alt: "Garden Salad Image",
    //     link: "categoryPage.html?category=GardenSalad"
    //   },
    //   {
    //     name: "Spinach Salad",
    //     description: "Fresh spinach leaves with ingredients like strawberries, walnuts, goat cheese, and a balsamic vinaigrette.",
    //     price: "11.75",
    //     imgSrc: "./img/Spinach-Salad.png",
    //     alt: "Spinach Salad Image",
    //     link: "categoryPage.html?category=SpinachSalad"
    //   },
    //   {
    //     name: "Fruit Salad",
    //     description: "A mix of fresh seasonal fruits, often served with a light honey-lime dressing.",
    //     price: "9.90",
    //     imgSrc: "./img/Fruit-Salad.png",
    //     alt: "Fruit Salad Image",
    //     link: "categoryPage.html?category=FruitSalad"
    //   },
    //   {
    //     name: "Quinoa Salad",
    //     description: "A protein-packed salad with quinoa, roasted vegetables, and a lemon vinaigrette.",
    //     price: "15.00",
    //     imgSrc: "./img/Quinoa-Salad.jpg",
    //     alt: "Quinoa Salad Image",
    //     link: "categoryPage.html?category=QuinoaSalad"
    //   },
    //   {
    //     name: "Asian Salad",
    //     description: "A mix of cabbage, carrots, green onions, and sesame seeds with an Asian-style dressing.",
    //     price: "12.25",
    //     imgSrc: "./img/Asian-Salad.jpg",
    //     alt: "Asian Salad Image",
    //     link: "categoryPage.html?category=AsianSalad"
    //   },
    //   {
    //     name: "Avocado Salad",
    //     description: "Sliced avocado with mixed greens, cherry tomatoes, cucumbers, and a citrus dressing.",
    //     price: "13.00",
    //     imgSrc: "./img/Avocado-Salad.png",
    //     alt: "Avocado Salad Image",
    //     link: "categoryPage.html?category=AvocadoSalad"
    //   },
    //   {
    //     name: "Chef Salad",
    //     description: "A classic salad with lettuce, ham, turkey, cheese, hard-boiled eggs, and choice of dressing.",
    //     price: "14.50",
    //     imgSrc: "./img/Chef-Salad.jpg",
    //     alt: "Chef Salad Image",
    //     link: "categoryPage.html?category=ChefSalad"
    //   },
    //   {
    //     name: "Kale Salad",
    //     description: "Kale with a lemon vinaigrette, roasted nuts, and dried fruits like cranberries.",
    //     price: "12.75",
    //     imgSrc: "./img/Kale-Salad.jpg",
    //     alt: "Kale Salad Image",
    //     link: "categoryPage.html?category=KaleSalad"
    //   },
    //   {
    //     name: "Pasta Salad",
    //     description: "A pasta-based salad with vegetables, mozzarella, and Italian dressing.",
    //     price: "11.00",
    //     imgSrc: "./img/Pasta-Salad.jpg",
    //     alt: "Pasta Salad Image",
    //     link: "categoryPage.html?category=PastaSalad"
    //   },
    //   {
    //     name: "Southwest Salad",
    //     description: "A salad with grilled chicken, black beans, corn, avocado, and a cilantro-lime dressing.",
    //     price: "13.50",
    //     imgSrc: "./img/Southwest-Salad.png",
    //     alt: "Southwest Salad Image",
    //     link: "categoryPage.html?category=SouthwestSalad"
    //   },
    //   {
    //     name: "Tuna Salad",
    //     description: "A salad made with tuna, mixed greens, tomatoes, cucumbers, and a light mayo-based dressing.",
    //     price: "14.25",
    //     imgSrc: "./img/Tuna-Salad.png",
    //     alt: "Tuna Salad Image",
    //     link: "categoryPage.html?category=TunaSalad"
    //   },
    //   {
    //     name: "Caprese Salad",
    //     description: "A simple salad with fresh mozzarella, tomatoes, basil, and a drizzle of balsamic reduction.",
    //     price: "12.00",
    //     imgSrc: "./img/Caprese-Salad.png",
    //     alt: "Caprese Salad Image",
    //     link: "categoryPage.html?category=CapreseSalad"
    //   }
    // ],
    // Pasta :[
    //   {
    //     name: "Long Pasta",
    //     description: "This category includes pasta types that are long and slender. Examples include Spaghetti, Linguine, Fettuccine, and Capellini (Angel Hair).",
    //     price: "10",
    //     imgSrc: "./img/Long-Pasta.jpg",
    //     alt: "Long Pasta Image",
    //     link: "categoryPage.html?category=LongPasta"
    //   },
    //   {
    //     name: "Short Pasta",
    //     description: "These are bite-sized pieces of pasta that are ideal for thicker sauces or baked dishes. Examples include Penne, Fusilli, Rigatoni, and Farfalle (Bow-Tie).",
    //     price: "Varies",
    //     imgSrc: "./img/Short-Pasta.jpg",
    //     alt: "Short Pasta Image",
    //     link: "categoryPage.html?category=ShortPasta"
    //   },
    //   {
    //     name: "Stuffed Pasta",
    //     description: "These pasta shapes are filled with ingredients like cheese, meat, or vegetables. Examples include Ravioli, Tortellini, and Cannelloni.",
    //     price: "Varies",
    //     imgSrc: "./img/Stuffed-Pasta.jpg",
    //     alt: "Stuffed Pasta Image",
    //     link: "categoryPage.html?category=StuffedPasta"
    //   },
    //   {
    //     name: "Specialty Pasta",
    //     description: "Some pasta types are used for specific traditional dishes. Examples include Lasagna, Orecchiette, and Cavatelli.",
    //     price: "Varies",
    //     imgSrc: "./img/Specialty-Pasta.png",
    //     alt: "Specialty Pasta Image",
    //     link: "categoryPage.html?category=SpecialtyPasta"
    //   },
    //   {
    //     name: "Gluten-Free Pasta",
    //     description: "For those with dietary restrictions,  corn, quinoa, or chickpeas.",
    //     price: "Varies",
    //     imgSrc: "./img/Gluten-Free-Pasta.png",
    //     alt: "Gluten-Free Pasta Image",
    //     link: "categoryPage.html?category=GlutenFreePasta"
    //   }
    // ],
   
    // ,
    // Breakfast : [
    //   {
    //     name: "Classic Breakfast",
    //     description: "Eggs (scrambled, fried, poached), bacon, sausage, toast, and hash browns.",
    //     price: "15.00",
    //     imgSrc: "./img/classic-breakfast.jpg",
    //     alt: "Classic Breakfast Image",
    //     link: "categoryPage.html?category=ClassicBreakfast"
    //   },
    //   {
    //     name: "Pancakes & Waffles",
    //     description: "Pancakes with syrup, berries, or chocolate chips; Belgian waffles with fruit and whipped cream.",
    //     price: "13.50",
    //     imgSrc: "./img/Pancake.png",
    //     alt: "Pancakes and Waffles Image",
    //     link: "categoryPage.html?category=PancakesWaffles"
    //   },
    //   {
    //     name: "Breakfast Sandwich",
    //     description: "Egg & cheese sandwich, bacon egg muffin, or breakfast burrito.",
    //     price: "11.50",
    //     imgSrc: "./img/breakfast-sandwich.jpg",
    //     alt: "Breakfast Sandwich Image",
    //     link: "categoryPage.html?category=BreakfastSandwich"
    //   },
    //   {
    //     name: "Cereal & Granola",
    //     description: "Cornflakes, muesli, or granola with yogurt.",
    //     price: "9.00",
    //     imgSrc: "./img/cereal-granola.jpg",
    //     alt: "Cereal and Granola Image",
    //     link: "categoryPage.html?category=CerealGranola"
    //   },
    //   {
    //     name: "Pastries & Baked Goods",
    //     description: "Croissants, Danish pastries, and muffins.",
    //     price: "8.50",
    //     imgSrc: "./img/pastries.jpg",
    //     alt: "Pastries and Baked Goods Image",
    //     link: "categoryPage.html?category=PastriesBakedGoods"
    //   },
    //   {
    //     name: "Healthy & Light",
    //     description: "Avocado toast, Greek yogurt bowl, and smoothie bowls.",
    //     price: "12.00",
    //     imgSrc: "./img/healthy-breakfast.jpg",
    //     alt: "Healthy Breakfast Image",
    //     link: "categoryPage.html?category=HealthyLight"
    //   },
    //   {
    //     name: "Continental Breakfast",
    //     description: "Bread rolls, butter, jam, cheese, tea or coffee.",
    //     price: "10.00",
    //     imgSrc: "./img/continental.jpg",
    //     alt: "Continental Breakfast Image",
    //     link: "categoryPage.html?category=Continental"
    //   },
   
    // ],
    //  Soups :[
    //   {
    //     name: "Chicken Noodle Soup",
    //     description: "A comforting broth with tender chicken, noodles, carrots, and celery.",
    //     price: "9.50",
    //     imgSrc: "./img/chicken-noodle-soup.jpg",
    //     alt: "Chicken Noodle Soup Image",
    //     link: "categoryPage.html?category=ChickenNoodleSoup"
    //   },
    //   {
    //     name: "Tomato Soup",
    //     description: "Smooth and rich tomato-based soup, often served with a side of grilled cheese.",
    //     price: "8.00",
    //     imgSrc: "./img/tomato-soup.jpg",
    //     alt: "Tomato Soup Image",
    //     link: "categoryPage.html?category=TomatoSoup"
    //   },
    //   {
    //     name: "Minestrone Soup",
    //     description: "A hearty Italian soup with vegetables, beans, and pasta in tomato broth.",
    //     price: "9.00",
    //     imgSrc: "./img/minestrone.jpg",
    //     alt: "Minestrone Soup Image",
    //     link: "categoryPage.html?category=MinestroneSoup"
    //   },
    //   {
    //     name: "French Onion Soup",
    //     description: "Caramelized onions in beef broth topped with toasted bread and melted cheese.",
    //     price: "10.50",
    //     imgSrc: "./img/french-onion.jpg",
    //     alt: "French Onion Soup Image",
    //     link: "categoryPage.html?category=FrenchOnionSoup"
    //   },
    //   {
    //     name: "Clam Chowder",
    //     description: "Creamy soup made with clams, potatoes, and onions. Available in New England or Manhattan style.",
    //     price: "11.00",
    //     imgSrc: "./img/clam-chowder.jpg",
    //     alt: "Clam Chowder Image",
    //     link: "categoryPage.html?category=ClamChowder"
    //   },
    //   {
    //     name: "Hot and Sour Soup",
    //     description: "A spicy and tangy Chinese soup with tofu, mushrooms, and bamboo shoots.",
    //     price: "8.50",
    //     imgSrc: "./img/Hot-Sour-Soup.jpg",
    //     alt: "Hot and Sour Soup Image",
    //     link: "categoryPage.html?category=HotAndSourSoup"
    //   },
    //   {
    //     name: "Miso Soup",
    //     description: "Traditional Japanese soup with miso paste, tofu, seaweed, and scallions.",
    //     price: "7.00",
    //     imgSrc: "./img/miso.jpg",
    //     alt: "Miso Soup Image",
    //     link: "categoryPage.html?category=MisoSoup"
    //   },
    //   {
    //     name: "Lentil Soup",
    //     description: "Nutritious soup made with lentils, vegetables, and aromatic spices.",
    //     price: "8.75",
    //     imgSrc: "./img/lentil.jpg",
    //     alt: "Lentil Soup Image",
    //     link: "categoryPage.html?category=LentilSoup"
    //   },
    //   {
    //     name: "Pumpkin Soup",
    //     description: "Creamy, lightly spiced pumpkin puree soup, perfect for autumn days.",
    //     price: "9.25",
    //     imgSrc: "./img/pumpkin.jpg",
    //     alt: "Pumpkin Soup Image",
    //     link: "categoryPage.html?category=PumpkinSoup"
    //   },
    //   {
    //     name: "Beef Stew",
    //     description: "Rich and hearty soup with chunks of beef, potatoes, and carrots in a savory broth.",
    //     price: "11.50",
    //     imgSrc: "./img/beef-stew.jpg",
    //     alt: "Beef Stew Image",
    //     link: "categoryPage.html?category=BeefStew"
    //   }
    // ]