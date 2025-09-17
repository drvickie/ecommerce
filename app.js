// Simple Cart System
let cartCount = 0;
const cartCountEl = document.getElementById("cart-count");
const cartButtons = document.querySelectorAll(".add-to-cart");

cartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    cartCount++;
    cartCountEl.textContent = cartCount;
    alert(`${btn.dataset.name} added to cart!`);
  });
});

// Filtering Logic
const productList = document.getElementById("product-list");
const categoryFilters = document.querySelectorAll(".filter");
const priceFilters = document.querySelectorAll(".price-filter");

function filterProducts() {
  const activeCategories = Array.from(categoryFilters)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const activePrices = Array.from(priceFilters)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const products = productList.querySelectorAll(".card");

  products.forEach(product => {
    const category = product.dataset.category;
    const price = parseInt(product.dataset.price);

    let categoryMatch = activeCategories.length === 0 || activeCategories.includes(category);
    let priceMatch = false;

    if (activePrices.length === 0) {
      priceMatch = true;
    } else {
      activePrices.forEach(range => {
        if (range === "20" && price < 20) priceMatch = true;
        if (range === "100" && price >= 20 && price <= 100) priceMatch = true;
        if (range === "200" && price > 100 && price <= 200) priceMatch = true;
        if (range === "201" && price > 200) priceMatch = true;
      });
    }

    if (categoryMatch && priceMatch) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

categoryFilters.forEach(cb => cb.addEventListener("change", filterProducts));
priceFilters.forEach(cb => cb.addEventListener("change", filterProducts));
