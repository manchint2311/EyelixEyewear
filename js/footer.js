// ============ FOOTER COMPONENT ============
// File: js/footer.js
// Usage: <footer id="footer"></footer> + <script src="js/footer.js"></script>

const footerHTML = `
    <div class="footer-main">
        <div class="container">
            <div class="footer-col">
                <h5>About Us</h5>
                <img src="images/logo/eyelix-logo.png" alt="Eyelix" width="200">
                <p>Eyelix Eyewear creates stylish, eco-friendly sunglasses made from sustainable materials to protect both your eyes and the planet.</p>
            </div>

            <div class="footer-col">
                <h5>Brand</h5>
                <ul>
                    <li><a href="glasses.html">Glasses</a></li>
                    <li><a href="sunglasses.html">Sunglasses</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h5>Help</h5>
                <ul>
                    <li><a href="faq.html">FAQs</a></li>
                    <li><a href="terms.html">Terms & Conditions</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h5>Account</h5>
                <ul>
                    <li><a href="account.html">My Account</a></li>
                    <li><a href="wishlist.html">Wishlist</a></li>
                    <li><a href="cart.html">Cart</a></li>
                    <li><a href="checkout.html">Check Out</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h5>Contact Us</h5>
                <p>094 830 91 23</p>
                <p>hello.eyelix@gmail.com</p>
                <p>279 Nguyen Tri Phuong, Dien Hong District, Ho Chi Minh City, Vietnam</p>
            </div>
        </div>
    </div>

    <div class="footer-bottom">
        <div class="container">
             <div class="social-links">
                <a href="#" class="social-icon" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                </a>
                <a href="#" class="social-icon" aria-label="Twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                </a>
                <a href="#" class="social-icon" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                </a>
            </div>
            <p class="copyright">© 2025 Eyelix Eyewear</p>
        </div>
    </div>
`;

// Insert footer HTML vào #footer element
function initFooter() {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
        setupFooterEvents();
    }
}

// Setup event listeners for footer interactions
function setupFooterEvents() {
    // Social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('aria-label');
            console.log(`Opening ${platform}`);
            // TODO: Implement social media links
        });
    });

    // Smooth scroll for footer links
    document.querySelectorAll('.footer-col a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Let normal navigation happen, but can add tracking here
            console.log(`Navigating to: ${link.getAttribute('href')}`);
        });
    });
}

// Initialize footer khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
} else {
    initFooter();
}
