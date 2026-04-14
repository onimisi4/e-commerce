var cart = [];

function addToCart(productId) {
  var product = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
      break;
    }
  }

  var existingItem = null;
  for (var j = 0; j < cart.length; j++) {
    if (cart[j].id === productId) {
      existingItem = cart[j];
      break;
    }
  }

  if (existingItem !== null) {
    existingItem.quantity = existingItem.quantity + 1;
  } else {
    var newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      quantity: 1,
    };
    cart.push(newItem);
  }

  updateCartDisplay();
  showToast(product.name + " added to cart!");
}

function removeFromCart(productId) {
  var newCart = [];
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id !== productId) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;

  updateCartDisplay();
}

function calculateTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].quantity;
  }
  return total;
}

function countCartItems() {
  var count = 0;
  for (var i = 0; i < cart.length; i++) {
    count = count + cart[i].quantity;
  }
  return count;
}

function updateCartDisplay() {
  var cartCountEl = document.getElementById("cartCount");
  cartCountEl.textContent = countCartItems();

  var cartItemsEl = document.getElementById("cartItems");
  var cartFooterEl = document.getElementById("cartFooter");
  var cartTotalEl = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItemsEl.innerHTML =
      "<p class='cart-empty'>Your cart is empty. Add something cool! ⚡</p>";
    cartFooterEl.style.display = "none";
    return;
  }

  cartFooterEl.style.display = "block";

  var html = "";
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    html += "<div class='cart-item'>";
    html += "  <div class='cart-item-icon'>" + item.icon + "</div>";
    html += "  <div class='cart-item-info'>";
    html += "    <div class='cart-item-name'>" + item.name + "</div>";
    html +=
      "    <div class='cart-item-price'>$" +
      item.price +
      " × " +
      item.quantity +
      "</div>";
    html += "  </div>";
    html +=
      "  <button class='remove-btn' onclick='removeFromCart(" +
      item.id +
      ")'>✕</button>";
    html += "</div>";
  }

  cartItemsEl.innerHTML = html;
  cartTotalEl.textContent = "$" + calculateTotal();
}

function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

function showToast(message) {
  var toast = document.getElementById("toast");
  var toastMsg = document.getElementById("toastMessage");

  toastMsg.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}
