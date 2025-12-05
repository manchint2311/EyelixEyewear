 // Sample
        const products = [
            {
                id: 4182,
                title: 'Oris',
                category: 'Glasses',
                price: 660000,
                originalPrice: null,
                image: "images/products/oris.png",
                badge: 'new',
                sold: 7,
                rating: 5,
                reviewCount: 12,
                filter: ['all', 'bestseller', 'new'],
                variations: [
                    { color: 'black', image: 'images/products/oris.png' },
                    { color: 'tortoise', image: 'images/products/oris-tortoise.png' },
                    { color: 'rose', image: 'images/products/oris-rose.png' }
                ]
            },
            {
                id: 4176,
                title: 'Jules',
                category: 'Glasses',
                price: 760000,
                originalPrice: null,
                image: "images/products/jules.png",
                badge: null,
                sold: 1,
                rating: 4.5,
                reviewCount: 8,
                filter: ['all', 'bestseller'],
                variations: [
                    { color: 'black', image: 'images/products/jules-black.png' },
                    { color: 'tortoise', image: 'images/products/jules.png' },
                ]
            },
            {
                id: 4210,
                title: 'Maison',
                category: 'Sunglasses',
                price: 777000,
                originalPrice: null,
                image: "images/products/maison.png",
                badge: 'new',
                sold: 1,
                rating: 5,
                reviewCount: 3,
                filter: ['all', 'new'],
                variations: [
                    { color: 'black', image: 'images/products/maison.png' },
                    { color: 'gray', image: 'images/products/maison-gray.png' }
                ]
            },
            {
                id: 4202,
                title: 'Nuit',
                category: 'Sunglasses',
                price: 790000,
                originalPrice: null,
                image: "images/products/nuit.png",
                badge: null,
                sold: 5,
                rating: 4,
                reviewCount: 15,
                filter: ['all', 'bestseller'],
            },
            {
                id: 4194,
                title: 'Dada',
                category: 'Sunglasses',
                price: 780000,
                originalPrice: 800000,
                image: "images/products/dada.png",
                badge: 'sale',
                sold: 2,
                rating: 4.5,
                reviewCount: 6,
                filter: ['all', 'sale'],
                variations: [
                    { color: 'black', image: 'images/products/dada.png' },
                    { color: 'tortoise', image: 'images/products/dada-tortoise.png' }
                ]
            },
            {
                id: 4185,
                title: 'Aloe',
                category: 'Sunglasses',
                price: 650000,
                originalPrice: null,
                image: "images/products/aloe.png",
                badge: null,
                sold: 3,
                rating: 5,
                reviewCount: 10,
                filter: ['all'],
                variations: [
                    { color: 'black', image: 'images/products/aloe.png' },
                    { color: 'gold', image: 'images/products/aloe-gold.png' },
                    { color: 'rose', image: 'images/products/aloe-rose.png' }
                ]
            }
        ];

        let currentFilter = 'all';
        let currentSort = 'featured';
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function formatPrice(price) {
            return price.toLocaleString('vi-VN') + ' VND';
        }

        // Function to generate star rating HTML
        function generateStarRating(rating, reviewCount) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

            let starsHTML = '<div class="star">';
            
            // Full stars
            for (let i = 0; i < fullStars; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }
            
            // Half star
            if (hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            
            // Empty stars
            for (let i = 0; i < emptyStars; i++) {
                starsHTML += '<i class="far fa-star"></i>';
            }
            
            starsHTML += '</div>';
            
            return `
                <div class="product-rating">
                    ${starsHTML}
                    <span class="rating-count">(${reviewCount})</span>
                </div>
            `;
        }

        // Function to generate color variations HTML
        function generateColorVariations(productId, variations) {
            if (!variations || variations.length === 0) return '';
            
            let variationsHTML = '<div class="product-variations">';
            
            variations.forEach((variation, index) => {
                const activeClass = index === 0 ? 'active' : '';
                variationsHTML += `
                    <div class="color-option color-${variation.color} ${activeClass}" 
                         onclick="changeProductImage(${productId}, '${variation.image}', this)"
                         title="${variation.color}">
                    </div>
                `;
            });
            
            variationsHTML += '</div>';
            return variationsHTML;
        }

        // Function to change product image when color is clicked
        function changeProductImage(productId, newImage, clickedElement) {
            // Find the product card
            const productCard = clickedElement.closest('.product-item');
            const productImage = productCard.querySelector('.product-image img');
            
            // Update image with smooth transition
            productImage.style.opacity = '0.5';
            setTimeout(() => {
                productImage.src = newImage;
                productImage.style.opacity = '1';
            }, 150);
            
            // Update active state
            const allColorOptions = productCard.querySelectorAll('.color-option');
            allColorOptions.forEach(option => option.classList.remove('active'));
            clickedElement.classList.add('active');
        }

        function renderProducts() {
            const filtered = products.filter(p => p.filter.includes(currentFilter));
            
            let sorted = [...filtered];
            if (currentSort === 'price-low') {
                sorted.sort((a, b) => a.price - b.price);
            } else if (currentSort === 'price-high') {
                sorted.sort((a, b) => b.price - a.price);
            } else if (currentSort === 'newest') {
                sorted.reverse();
            }

            const grid = document.getElementById('productsGrid');
            grid.innerHTML = '';

            sorted.forEach(product => {
                const productHTML = `
                    <div class="product-item">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.title}" style="transition: opacity 0.3s ease;">
                            ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge === 'sale' ? 'Sale' : 'New'}</div>` : ''}
                        </div>
                        <div class="product-info">
                            <div class="product-category">${product.category}</div>
                            <div class="product-title">${product.title}</div>
                            ${generateColorVariations(product.id, product.variations)}
                            ${generateStarRating(product.rating, product.reviewCount)}
                            <div class="product-price ${product.badge === 'sale' ? 'sale' : ''}">
                                ${product.originalPrice ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
                                ${formatPrice(product.price)}
                            </div>
                            <div class="product-actions">
                                <button class="btn-add-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">
                                    Add to cart
                                </button>
                                <button class="btn-wishlist" onclick="toggleWishlist(this)">♡</button>
                            </div>
                            <div style="font-size: 12px; color: #687279; margin-top: 0.5rem;">
                                ${product.sold} sold
                            </div>
                        </div>
                    </div>
                `;
                grid.innerHTML += productHTML;
            });
        }

        // Filter handling
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.dataset.filter;
                renderProducts();
            });
        });

        // Sort handling
        document.getElementById('sortBy').addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });

        // Add to cart
        function addToCart(id, title, price) {
            cart.push({ id, title, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartCount', cart.length);
            
            // Update cart count in header
            if (window.updateCartCount) {
                window.updateCartCount();
            }
            
            alert(`${title} added to cart!`);
        }

        // Wishlist toggle
        function toggleWishlist(btn) {
            btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
            btn.style.color = btn.textContent === '♥' ? '#e00d0d' : 'inherit';
        }

        // Initial render
        renderProducts();

        // =====================================
        // SIDEBAR ACCORDION LOGIC
        // =====================================
        function toggleFilterSection(headerElement) {
            const parent = headerElement.closest('.filter-section-sidebar');
            const content = parent.querySelector('.filter-content');
            
            parent.classList.toggle('open');
            
            if (parent.classList.contains('open')) {
                // Mở
                content.classList.remove('collapsed');
            } else {
                // Đóng
                content.classList.add('collapsed');
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.filter-section-sidebar').forEach((group, index) => {
                const content = group.querySelector('.filter-content');
                if (index === 0) {
                    group.classList.add('open');
                    content.classList.remove('collapsed');
                } else {
                    group.classList.remove('open');
                    content.classList.add('collapsed');
                }
            });
        });
