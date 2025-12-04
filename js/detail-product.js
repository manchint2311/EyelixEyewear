
        // Change Main Image
        function changeImage(src, element) {
            document.getElementById('mainImage').src = src;
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            element.classList.add('active');
        }

        // Color Selection
        function selectColor(element, newImageSrc) {
            // Xóa active class khỏi các lựa chọn màu khác
            document.querySelectorAll('.color-option').forEach(color => {
                color.classList.remove('active');
            });
            // Đặt active class cho lựa chọn hiện tại
            element.classList.add('active');

            // Cập nhật ảnh chính
            if (newImageSrc) {
                document.getElementById('mainImage').src = newImageSrc;
            }
            
            // Cập nhật thumbnail (tùy chọn: bỏ active ở thumbnail)
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Tự động kích hoạt thumbnail đầu tiên khi chuyển về màu Black (tùy chọn)
            if (element.classList.contains('color-black')) {
                document.querySelector('.thumbnail').classList.add('active');
            }
        }
        // Quantity Controls
        function increaseQuantity() {
            const input = document.getElementById('quantity');
            input.value = parseInt(input.value) + 1;
        }

        function decreaseQuantity() {
            const input = document.getElementById('quantity');
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        }

        // Add to Cart
        function addToCart() {
            const quantity = document.getElementById('quantity').value;
            alert(`Added ${quantity} Kala sunglasses to cart!`);
        }

        // Wishlist Toggle
        function toggleWishlist(btn) {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                btn.style.color = '#e00d0d';
                btn.style.borderColor = '#e00d0d';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                btn.style.color = '#666';
                btn.style.borderColor = '#ddd';
            }
        }

        // Tab Switching
        function openTab(evt, tabName) {
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Remove active class from all buttons
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected tab and mark button as active
            document.getElementById(tabName).classList.add('active');
            evt.currentTarget.classList.add('active');
        }
