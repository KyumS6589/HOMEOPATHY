// backend.js

// Example product list (replace with API data if needed)
const products = [
  {
    id: 1,
    name: "Nux Vomica",
    price: 12.99,
    image: "Nux Vomica.jfif"
  },
  {
    id: 2,
    name: "Oscillococcinum",
    price: 19.50,
    image: "Oscillococcinum.jfif"
  },
  {
    id: 3,
    name: "Product 3",
    price: 15.00,
    image: "product1.jfif"
  },
  {
    id: 4,
    name: "Product 4",
    price: 25.00,
    image: "promo.jfif"
  }
];

// Populate product carousel if container exists
function loadCarouselProducts() {
  const carouselContainers = document.querySelectorAll('.product-carousel .carousel-items');

  carouselContainers.forEach(container => {
    container.innerHTML = ''; // Clear previous content

    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="btn-primary" onclick="addToCart(${product.id})">
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
      `;

      container.appendChild(card);
    });
  });
}

// Cart handling
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items');
  const cartTotalElem = document.getElementById('cart-total');

  if (!cartContainer || !cartTotalElem) return; // Skip if not on cart page

  cartContainer.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button onclick="removeFromCart(${item.id})" class="btn-remove">Remove</button></td>
    `;
    total += item.price * item.quantity;
    cartContainer.appendChild(row);
  });

  cartTotalElem.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Proceeding to payment...');
  window.location.href = 'pay.html';
}

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCarouselProducts();
  updateCartDisplay();
});
