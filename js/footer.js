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
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🦆</a>
                <a href="#" aria-label="Instagram">📷</a>
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