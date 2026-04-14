function createProductCard(product) {
  var stars = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= product.rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }

  var badgeHTML = "";
  if (product.badge === "sale") {
    badgeHTML = "<span class='badge badge-sale'>Sale</span>";
  } else if (product.badge === "new") {
    badgeHTML = "<span class='badge badge-new'>New</span>";
  } else if (product.badge === "hot") {
    badgeHTML = "<span class='badge badge-hot'>🔥 Hot</span>";
  }

  var oldPriceHTML = "";
  if (product.oldPrice !== null) {
    oldPriceHTML = "<span class='old-price'>$" + product.oldPrice + "</span>";
  }

  var cardHTML = "";
  cardHTML += "<div class='product-card'>";
  cardHTML += "  <div class='card-image'>";
  cardHTML += "    " + badgeHTML;
  cardHTML += "    <span class='product-icon'>" + product.icon + "</span>";
  cardHTML += "  </div>";
  cardHTML += "  <div class='card-body'>";
  cardHTML += "    <div class='card-category'>" + product.category + "</div>";
  cardHTML += "    <div class='card-name'>" + product.name + "</div>";
  cardHTML += "    <div class='card-stars'>" + stars + "</div>";
  cardHTML += "    <div class='card-footer'>";
  cardHTML += "      <div class='card-pricing'>";
  cardHTML += "        " + oldPriceHTML;
  cardHTML += "        <span class='price'>$" + product.price + "</span>";
  cardHTML += "      </div>";
  cardHTML +=
    "      <button class='add-btn' onclick='addToCart(" +
    product.id +
    ")'>+</button>";
  cardHTML += "    </div>";
  cardHTML += "  </div>";
  cardHTML += "</div>";

  return cardHTML;
}

function showProducts(filter) {
  var grid = document.getElementById("productGrid");
  var countLabel = document.getElementById("productCount");

  var productsToShow = [];

  if (filter === "All") {
    productsToShow = products;
  } else {
    for (var i = 0; i < products.length; i++) {
      if (products[i].category === filter) {
        productsToShow.push(products[i]);
      }
    }
  }

  countLabel.textContent = productsToShow.length + " items";

  var allCardsHTML = "";
  for (var j = 0; j < productsToShow.length; j++) {
    allCardsHTML += createProductCard(productsToShow[j]);
  }
  grid.innerHTML = allCardsHTML;
}

function filterProducts(category, clickedButton) {
  var allChips = document.querySelectorAll(".chip");
  for (var i = 0; i < allChips.length; i++) {
    allChips[i].classList.remove("active");
  }

  clickedButton.classList.add("active");
  showProducts(category);
}

function scrollToShop() {
  var shopSection = document.getElementById("shopSection");
  shopSection.scrollIntoView({ behavior: "smooth" });
}

var cartButton = document.getElementById("cartButton");
cartButton.onclick = function () {
  openCart();
};

showProducts("All");
