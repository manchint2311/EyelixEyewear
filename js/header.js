// ============ HEADER COMPONENT ============
// File: js/header.js
// Usage: <header id="header"></header> + <script src="js/header.js"></script>

const headerHTML = `

    <!-- Main Navigation -->
    <nav class="main-nav">
        <div class="nav-wrapper">
            <!-- Left Menu -->
            <ul class="nav-left">
                <li class="dropdown">
                    <a href="products.html">PRODUCTS</a>
                    <ul class="submenu">
                        <li><a href="glasses.html">GLASSES</a></li>
                        <li><a href="sunglasses.html">SUNGLASSES</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="collections.html">COLLECTIONS</a>
                    <ul class="submenu">
                        <li><a href="recycled-aluminium.html">RECYCLED ALUMINIUM</a></li>
                        <li><a href="fall-winter-2025.html">FALL/WINTER 2025</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="about.html">ABOUT</a>
                    <ul class="submenu">
                        <li><a href="our-story.html">OUR STORY</a></li>
                        <li><a href="our-mission.html">OUR MISSION</a></li>
                    </ul>
                </li>
                <li><a href="blog.html">EXPLORE</a></li>
            </ul>

            <!-- Logo Center -->
            <div class="logo">
                <a href="index.html">
                    <img src="images/logo/eyelix-logo.png" alt="Eyelix Eyewear">
                </a>
            </div>

            <!-- Right Icons -->
            <div class="nav-right">
                <button class="icon-btn search-btn" aria-label="Search" onclick="openSearch()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </button>
                
                <a href="account.html" class="icon-btn account-btn" aria-label="Account">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </a>
                
                <a href="cart.html" class="icon-btn cart-btn" aria-label="Cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span class="cart-count">0</span>
                </a>
                
                <a href="wishlist.html" class="btn-wishlist">WISHLIST</a>
            </div>
        </div>
    </nav>
`;

// Insert header HTML vào #header element
function initHeader() {
    const headerElement = document.getElementById('header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
        
        // Update cart count từ localStorage
        updateCartCount();
        
        // Set active menu item
        setActiveMenu();
        
        // Thêm event listeners
        setupHeaderEvents();
    }
}

// Update giỏ hàng count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('eyelixCart')) || [];
        cartCount.textContent = cart.length;
    }
}

// Set active menu item dựa trên current page
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-left a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
}

// Setup event listeners for header interactions
function setupHeaderEvents() {
    // Search button
    const searchBtn = document.querySelector('.search-btn');

    // Dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });

        // Close submenu khi click outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    });

    // Listen for cart updates
    window.addEventListener('storage', () => {
        updateCartCount();
    });

    // Custom event for cart updates
    window.addEventListener('cartUpdated', () => {
        updateCartCount();
    });
}

// Initialize header khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
} else {
    initHeader();
}
