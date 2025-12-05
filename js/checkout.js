// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM References
const orderItemsContainer = document.getElementById("order-items");
const subtotalEl = document.getElementById("order-subtotal");
const totalEl = document.getElementById("order-total");
const placeOrderBtn = document.getElementById("place-order");

// Render Cart Items
function renderCartItems() {
    let subtotal = 0;
    orderItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `
            <div style="padding:10px; color:#555;">Your cart is empty</div>
        `;
        updateTotal();
        return;
    }

    cart.forEach(item => {
        let qty = item.quantity || 1;            // FIX: đúng field
        let itemTotal = item.price * qty;
        subtotal += itemTotal;

        orderItemsContainer.innerHTML += `
            <div class="order-item-row">
                <div class="product-name">
                    ${item.title} <span style="color:#777">× ${qty}</span>
                </div>
                <div class="product-total">
                    ${itemTotal.toLocaleString("vi-VN")} VND
                </div>
            </div>
        `;
    });

    subtotalEl.textContent = subtotal.toLocaleString("vi-VN") + " VND";

    updateTotal();
}

// Update Total
function updateTotal() {
    let subtotal = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    let shippingCost = 0;

    if (selectedShipping) {
        shippingCost = selectedShipping.value === "instant" ? 50000 : 20000;
    }

    let total = subtotal + shippingCost;

    totalEl.textContent = total.toLocaleString("vi-VN") + " VND";
}

// Shipping change listener
document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener("change", updateTotal);
});

// Toggle different address
const diffAddressCheckbox = document.getElementById("different-address");
const diffAddressForm = document.getElementById("shipping-address");

if (diffAddressCheckbox && diffAddressForm) {
    diffAddressCheckbox.addEventListener("change", () => {
        diffAddressForm.style.display = diffAddressCheckbox.checked ? "block" : "none";
    });
}

// Place Order
if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        const fullName = document.getElementById("full-name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;

        if (!fullName || !phone || !address) {
            alert("Please fill in all required fields (*)");
            return;
        }

        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });
}

// Init
renderCartItems();
