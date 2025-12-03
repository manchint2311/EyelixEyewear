// 1. Thay dữ liệu mẫu bằng dữ liệu thật từ LocalStorage
let cart = JSON.parse(localStorage.getItem("eyelixCart")) || [];

// 2. DOM References
const orderItemsContainer = document.getElementById("order-items");
const subtotalEl = document.getElementById("order-subtotal");
const totalEl = document.getElementById("order-total");
const placeOrderBtn = document.getElementById("place-order");

// Render Cart Items
function renderCartItems() {
    let subtotal = 0;
    orderItemsContainer.innerHTML = '';
    
    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<div style="padding:10px; color:#555;">Your cart is empty</div>';
    }

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        // Cộng dồn vào biến subtotal số học (để tính toán chính xác)
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

    // Hiển thị Subtotal
    if(subtotalEl) {
        subtotalEl.textContent = subtotal.toLocaleString("vi-VN") + " VND";
    }
    
    // Gọi hàm tính tổng ngay sau khi render xong
    updateTotal();
}

// Update Total 
function updateTotal() {
    // 1. Tính lại subtotal từ dữ liệu gốc (cart) thay vì đọc từ HTML 
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // 2. Lấy giá trị ship
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    let shippingCost = 0;

    if (selectedShipping) {
        // Nếu chọn instant thì 50k, ngược lại (express) là 20k
        shippingCost = selectedShipping.value === "instant" ? 50000 : 20000;
    }

    // 3. Tính tổng cuối cùng
    let total = subtotal + shippingCost;

    // 4. Hiển thị ra màn hình
    if(totalEl) {
        totalEl.textContent = total.toLocaleString("vi-VN") + " VND";
    }
}

// Bắt sự kiện khi đổi phương thức vận chuyển -> Tính lại tiền ngay
document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', updateTotal);
});

// Xử lý ẩn hiện form "Ship to different address"
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

        // Kiểm tra giỏ hàng
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Kiểm tra phương thức thanh toán
        const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        
        // Validate đơn giản các trường bắt buộc
        const fullName = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        if (!fullName || !phone || !address) {
            alert("Please fill in all required fields (*)");
            return;
        }

        // Thành công
        alert("Order placed successfully!");
        
        // Xóa giỏ hàng sau khi mua thành công
        localStorage.removeItem("eyelixCart");
        window.location.href = "index.html";
    });
}

// Initialize Checkout Page
renderCartItems();