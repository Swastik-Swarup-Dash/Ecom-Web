let cart = [];

// Login Modal Functions
function openLoginModal() {
  const modal = document.getElementById('login-modal');
  modal.style.display = 'flex';
}

function closeLoginModal() {
  const modal = document.getElementById('login-modal');
  modal.style.display = 'none';
}

// Cart Functions
function addToCart(productId) {
  const product = document.querySelector(`.product[data-id="${productId}"]`);
  const productName = product.querySelector('h3').innerText;
  const productPrice = product.querySelector('p').innerText;

  const item = {
    id: productId,
    name: productName,
    price: productPrice,
  };

  cart.push(item);
  updateCart();
  showCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function updateCart() {
  const cartContent = document.getElementById('cart-content');
  const cartCount = document.getElementById('cart-count');

  // Clear the cart content
  cartContent.innerHTML = '';

  // Add each item to the cart
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <span>${item.name} - ${item.price}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContent.appendChild(cartItem);
  });

  // Update cart count
  cartCount.innerText = cart.length;
}

function showCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.style.display = 'block';
}

function goToCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    // Save cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Redirect to checkout page
    window.location.href = 'checkout.html';
  }
}



const products = [{
  id: 1,
  name: 'Product 1',
  price: '$10.00',
  img_link:'./image1.jpg'
}]