document.addEventListener('DOMContentLoaded', () => {
    // A simple function to add product cards to a carousel
    function addProductCards(container, products) {
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>₹${product.price}</p>
                <button>Add to Cart</button>
            `;
            container.appendChild(card);
        });
    }

    // Example data
    const bestsellers = [
        { name: 'Arnica Montana 30C', image: 'product1.bin', price: '150' },
        { name: 'Nux Vomica 200C', image: 'Nux Vomica.bin', price: '180' },
        // ... more products
    ];

    const coldRemedies = [
        { name: 'Oscillococcinum', image: 'Oscillococcinum.bin', price: '250' },
        // ... more products
    ];

    // Load products into the carousels
    const bestsellerCarousel = document.querySelector('.product-carousel .carousel-items');
    addProductCards(bestsellerCarousel, bestsellers);

    const coldRemedyCarousel = document.querySelectorAll('.product-carousel .carousel-items')[1];
    addProductCards(coldRemedyCarousel, coldRemedies);
});

