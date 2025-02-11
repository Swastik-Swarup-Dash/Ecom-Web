document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutContent = document.getElementById('checkout-content');
    const totalAmount = document.getElementById('total-amount');
  
    let total = 0;
  
    // Display cart items on the checkout page
    cart.forEach(item => {
      const checkoutItem = document.createElement('div');
      checkoutItem.className = 'checkout-item';
      checkoutItem.innerHTML = `
        <span>${item.name} - ${item.price}</span>
      `;
      checkoutContent.appendChild(checkoutItem);
  
      // Calculate total amount
      total += parseFloat(item.price.replace('$', ''));
    });
  
    // Display total amount
    totalAmount.innerText = `Total: $${total.toFixed(2)}`;
  });
  
  function confirmCheckout() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  }