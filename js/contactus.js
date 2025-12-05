// DOM Elements
const contactForm = document.getElementById('contact-form');

// Handle Form Submit
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        // Get form data
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation (HTML required already checks, just adding extra check)
        if (!name || !phone || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        // Simulate successful submission
        alert(`Thank you, ${name}! We have received your message.\nWe will contact you shortly at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// DOM Elements
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
const addToWishlistButtons = document.querySelectorAll('.btn-add-to-wishlist');

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("eyelixCart")) || [];
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.qty += 1;  
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            qty: 1,
            image: product.image
        });
    }

    localStorage.setItem("eyelixCart", JSON.stringify(cart));
    alert(`"${product.name}" has been added to your cart!`);
}


