// ========================================
// SHOPPING CART FUNCTIONALITY
// ========================================

// Cart Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart
function initCart() {
    updateCartCount();
    updateCartUI();
}

// Add to cart
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-add-cart')) {
        const productCard = e.target.closest('.product-card');
        const product = {
            id: productCard.dataset.productId || Date.now().toString(),
            name: productCard.querySelector('h3')?.textContent || 'Product',
            price: parsePrice(productCard.querySelector('.price')?.textContent),
            image: productCard.querySelector('img')?.src || '',
            quantity: 1
        };
        
        addToCart(product);
    }
});

// Add product to cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
        showNotification(`${product.name} quantity updated in cart`);
    } else {
        cart.push(product);
        showNotification(`${product.name} added to cart`);
    }
    
    saveCart();
    updateCartCount();
    updateCartUI();
}

// Remove from cart
function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    
    if (product) {
        showNotification(`${product.name} removed from cart`);
    }
    
    saveCart();
    updateCartCount();
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    
    if (product) {
        product.quantity += change;
        
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Update cart count badge
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.querySelector('.cart-count');
    
    if (badge) {
        badge.textContent = cartCount;
        
        if (cartCount > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Update cart UI (for cart page)
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart to see them here.</p>
                <a href="products.html" class="btn-primary">Start Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)} VND</p>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-btn minus" data-id="${item.id}">-</button>
                <span class="qty">${item.quantity}</span>
                <button class="qty-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">
                <p>${formatPrice(item.price * item.quantity)} VND</p>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        </div>
    `).join('');
    
    // Add event listeners
    cartContainer.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
    });
    
    cartContainer.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
    });
    
    cartContainer.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });
    
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 30000 : 0; // 30k shipping
    const tax = Math.round(subtotal * 0.1); // 10% VAT
    const total = subtotal + shipping + tax;
    
    const summaryElement = document.getElementById('cart-summary');
    
    if (summaryElement) {
        summaryElement.innerHTML = `
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)} VND</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>${formatPrice(shipping)} VND</span>
            </div>
            <div class="summary-row">
                <span>Tax (10%):</span>
                <span>${formatPrice(tax)} VND</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>${formatPrice(total)} VND</span>
            </div>
            <button class="btn-primary checkout-btn" ${cart.length === 0 ? 'disabled' : ''}>
                Proceed to Checkout
            </button>
        `;
        
        const checkoutBtn = summaryElement.querySelector('.checkout-btn');
        if (checkoutBtn && cart.length > 0) {
            checkoutBtn.addEventListener('click', () => {
                window.location.href = 'checkout.html';
            });
        }
    }
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        updateCartUI();
        showNotification('Cart cleared');
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Helper: Parse price from string
function parsePrice(priceString) {
    if (!priceString) return 0;
    
    // Remove all non-numeric characters except dots and commas
    const cleaned = priceString.replace(/[^\d.,]/g, '');
    // Convert to number
    return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0;
}

// Helper: Format price
function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}

// Mini cart dropdown
function createMiniCart() {
    const cartBtn = document.querySelector('.cart-btn');
    if (!cartBtn) return;
    
    const miniCart = document.createElement('div');
    miniCart.className = 'mini-cart';
    miniCart.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        border-radius: 8px;
        padding: 20px;
        min-width: 320px;
        max-height: 400px;
        overflow-y: auto;
        opacity: 0;
        visibility: hidden;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    cartBtn.parentElement.style.position = 'relative';
    cartBtn.parentElement.appendChild(miniCart);
    
    // Show/hide mini cart
    cartBtn.addEventListener('mouseenter', () => {
        updateMiniCart();
        miniCart.style.opacity = '1';
        miniCart.style.visibility = 'visible';
        miniCart.style.transform = 'translateY(0)';
    });
    
    cartBtn.parentElement.addEventListener('mouseleave', () => {
        miniCart.style.opacity = '0';
        miniCart.style.visibility = 'hidden';
        miniCart.style.transform = 'translateY(10px)';
    });
}

// Update mini cart content
function updateMiniCart() {
    const miniCart = document.querySelector('.mini-cart');
    if (!miniCart) return;
    
    if (cart.length === 0) {
        miniCart.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        return;
    }
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    miniCart.innerHTML = `
        ${cart.slice(0, 3).map(item => `
            <div style="display: flex; gap: 15px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                <div style="flex: 1;">
                    <h5 style="margin: 0 0 5px; font-size: 14px;">${item.name}</h5>
                    <p style="margin: 0; font-size: 13px; color: #999;">${item.quantity} × ${formatPrice(item.price)} VND</p>
                </div>
            </div>
        `).join('')}
        ${cart.length > 3 ? `<p style="text-align: center; color: #999; font-size: 12px;">+ ${cart.length - 3} more items</p>` : ''}
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-weight: 600;">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)} VND</span>
            </div>
            <a href="cart.html" class="btn-primary" style="display: block; text-align: center; width: 100%;">View Cart</a>
        </div>
    `;
}

// Apply coupon code
function applyCoupon(code) {
    const validCoupons = {
        'WELCOME15': 0.15,
        'GREEN20': 0.20,
        'FALL20': 0.20
    };
    
    const discount = validCoupons[code.toUpperCase()];
    
    if (discount) {
        const currentDiscount = localStorage.getItem('appliedDiscount');
        if (currentDiscount) {
            showNotification('You have already applied a coupon');
            return false;
        }
        
        localStorage.setItem('appliedDiscount', discount);
        localStorage.setItem('couponCode', code.toUpperCase());
        showNotification(`Coupon ${code} applied! ${discount * 100}% off`);
        updateCartSummary();
        return true;
    } else {
        showNotification('Invalid coupon code');
        return false;
    }
}

// Remove coupon
function removeCoupon() {
    localStorage.removeItem('appliedDiscount');
    localStorage.removeItem('couponCode');
    showNotification('Coupon removed');
    updateCartSummary();
}

// Coupon form handler
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('coupon-form')) {
        e.preventDefault();
        const input = e.target.querySelector('input[name="coupon"]');
        if (input && input.value.trim()) {
            applyCoupon(input.value.trim());
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    createMiniCart();
});

// Export cart data for checkout
function getCartData() {
    return {
        items: cart,
        subtotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        discount: parseFloat(localStorage.getItem('appliedDiscount')) || 0,
        couponCode: localStorage.getItem('couponCode') || null
    };
}

// Quick add to cart (for product page)
window.quickAddToCart = function(productData) {
    addToCart(productData);
};

// Clear cart after successful order
window.clearCartAfterOrder = function() {
    cart = [];
    saveCart();
    updateCartCount();
    localStorage.removeItem('appliedDiscount');
    localStorage.removeItem('couponCode');
};

console.log('Cart system initialized');