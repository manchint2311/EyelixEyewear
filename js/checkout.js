let cart = JSON.parse(localStorage.getItem("eyelixCart")) || [];

// DOM References
const orderItemsContainer = document.getElementById("order-items");
const subtotalEl = document.getElementById("order-subtotal");
const totalEl = document.getElementById("order-total");
const placeOrderBtn = document.getElementById("place-order");

// Render Cart Items
function renderCartItems() {
    let subtotal = 0;
    orderItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<div style="padding:10px; color:#555;">Your cart is empty</div>';
    }

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        subtotal += itemTotal; 
        
        // Render HTML
        orderItemsContainer.innerHTML += `
            <div class="order-item-row">
                <div class="product-name">
                    ${item.name} <span style="color:#777">× ${item.qty}</span>
                </div>
                <div class="product-total">
                    ${itemTotal.toLocaleString("vi-VN")} VND
                </div>
            </div>
        `;
    });

    if(subtotalEl) {
        subtotalEl.textContent = subtotal.toLocaleString("vi-VN") + " VND";
    }
    
     updateTotal();
}

// Update Total 
function updateTotal() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // 2. Lấy giá trị ship
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    let shippingCost = 0;

    if (selectedShipping) {
        shippingCost = selectedShipping.value === "instant" ? 50000 : 20000;
    }

    let total = subtotal + shippingCost;

    if(totalEl) {
        totalEl.textContent = total.toLocaleString("vi-VN") + " VND";
    }
}

document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', updateTotal);
});

const diffAddressCheckbox = document.getElementById('different-address');
const diffAddressForm = document.getElementById('shipping-address');
if (diffAddressCheckbox && diffAddressForm) {
    diffAddressCheckbox.addEventListener('change', function() {
        diffAddressForm.style.display = this.checked ? 'block' : 'none';
    });
}

// Handle Place Order
if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        
        const fullName = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        if (!fullName || !phone || !address) {
            alert("Please fill in all required fields (*)");
            return;
        }

        alert("Order placed successfully!");
        
        localStorage.removeItem("eyelixCart");
        window.location.href = "index.html";
    });
}

// Initialize Checkout Page

renderCartItems();
