// ==========================================
// CART SYSTEM - CLEAN NEW VERSION (2025)
// ==========================================

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Ensure every item has quantity
cart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

saveCart();


// =====================
// Helper Functions
// =====================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}

// ⭐ ADD FIX — Tự lấy hình từ danh sách sản phẩm nếu cart không có image
function getCartImage(item) {
    if (item.image) return item.image; // dùng hình đã lưu
    
    const product = (window.products || []).find(p => p.id == item.id); 
    
    if (product) return product.image; // fallback theo products.js
    
    return "images/default.png"; // fallback cuối cùng
}


// ==========================================
// UPDATE CART COUNT ICON (HEADER)
// ==========================================
window.updateCartCount = function () {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? "flex" : "none";
};


// ==========================================
// RENDER CART ITEMS
// ==========================================
function updateCartUI() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart to see them here.</p>
                <a href="products.html" class="btn-primary">Start Shopping</a>
            </div>
        `;

        updateCartSummary();
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">

            <!-- LEFT INFO -->
            <div class="cart-item-left">
                <img src="${getCartImage(item)}" class="cart-thumb">

                <div class="cart-info">
                    <span class="name">${item.title}</span>
                    <span class="price">${formatPrice(item.price)} VND</span>
                </div>
            </div>

            <!-- QUANTITY -->
            <div class="quantity-box">
                <button class="qty-btn minus" data-id="${item.id}">-</button>
                <input type="number" class="qty-input" data-id="${item.id}" value="${item.quantity}" min="1">
                <button class="qty-btn plus" data-id="${item.id}">+</button>
            </div>

            <!-- SUBTOTAL -->
            <div class="cart-subtotal">
                ${formatPrice(item.price * item.quantity)} VND
            </div>

            <!-- REMOVE -->
            <div class="cart-remove">
                <button class="remove-item" data-id="${item.id}">×</button>
            </div>

        </div>
    `).join("");

    // Event: minus
    container.querySelectorAll(".minus").forEach(btn =>
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, -1))
    );

    // Event: plus
    container.querySelectorAll(".plus").forEach(btn =>
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, 1))
    );

    // Event: manual input
    container.querySelectorAll(".qty-input").forEach(input =>
        input.addEventListener("change", () => {
            let id = input.dataset.id;
            let newQty = Math.max(parseInt(input.value), 1);
            let item = cart.find(i => i.id == id);
            item.quantity = newQty;
            saveCart();
            updateCartUI();
        })
    );

    // Event: remove
    container.querySelectorAll(".remove-item").forEach(btn =>
        btn.addEventListener("click", () => removeFromCart(btn.dataset.id))
    );

    updateCartSummary();
}


// ==========================================
// UPDATE QUANTITY
// ==========================================
function updateQuantity(id, change) {
    const item = cart.find(i => i.id == id);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        updateCartUI();
    }
}


// ==========================================
// REMOVE ITEM
// ==========================================
function removeFromCart(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
    updateCartUI();
    updateCartCount();
}


// ==========================================
// CART SUMMARY (RIGHT SIDE TOTALS)
// ==========================================
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const shippingMethod = document.querySelector('input[name="shipping"]:checked')?.value;
    const shipping = subtotal === 0 
        ? 0 
        : shippingMethod === "instant"
            ? 50000
            : 20000;

    const total = subtotal + shipping;

    document.getElementById("summary-subtotal").textContent = formatPrice(subtotal) + " VND";
    document.getElementById("summary-total").textContent = formatPrice(total) + " VND";
}


// ==========================================
// SHIPPING CHANGE EVENT
// ==========================================
document.addEventListener("change", e => {
    if (e.target.name === "shipping") {
        updateCartSummary();
    }
});


// ==========================================
// CHECKOUT BUTTON
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const btnCheckout = document.getElementById("btn-checkout");
    if (btnCheckout) {
        btnCheckout.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            window.location.href = "checkout.html";
        });
    }
});


// ==========================================
// INIT ON PAGE LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateCartUI();
});
