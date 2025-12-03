// ========================================
// Login Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Form Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const loginBtn = document.querySelector('.btn-login');
    const formMessage = document.getElementById('formMessage');
    const facebookBtn = document.querySelector('.btn-facebook');

    // Showcase Slideshow
    const showcaseImages = document.querySelectorAll('.showcase-image');
    let currentImageIndex = 0;
    let slideInterval;

    // Initialize
    init();

    function init() {
        setupEventListeners();
        startShowcaseSlideshow();
        updateLoginButton();
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Toggle Password Visibility
        if (togglePasswordBtn) {
            togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
        }

        // Input Events
        usernameInput.addEventListener('input', handleInputChange);
        passwordInput.addEventListener('input', handleInputChange);

        // Form Submit
        loginForm.addEventListener('submit', handleFormSubmit);

        // Facebook Login
        if (facebookBtn) {
            facebookBtn.addEventListener('click', handleFacebookLogin);
        }

        // Prevent form submission on Enter in username field (optional)
        usernameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !loginBtn.disabled) {
                e.preventDefault();
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    // Toggle Password Visibility
    function togglePasswordVisibility() {
        const type = passwordInput.getAttribute('type');
        const showText = togglePasswordBtn.querySelector('.show-text');
        
        if (type === 'password') {
            passwordInput.setAttribute('type', 'text');
            showText.textContent = 'Hide';
        } else {
            passwordInput.setAttribute('type', 'password');
            showText.textContent = 'Show';
        }
    }

    // Handle Input Change
    function handleInputChange() {
        updateLoginButton();
        hideMessage();
    }

    // Update Login Button State
    function updateLoginButton() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (username && password) {
            loginBtn.disabled = false;
        } else {
            loginBtn.disabled = true;
        }
    }

    // Show Message
    function showMessage(message, type = 'error') {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.setAttribute('role', 'alert');
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(hideMessage, 3000);
        }
    }

    // Hide Message
    function hideMessage() {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }

    // Form Validation
    function validateForm(username, password) {
        // Check if username is empty
        if (!username) {
            showMessage('Please enter your username, email, or phone number.');
            usernameInput.focus();
            return false;
        }

        // Check if password is empty
        if (!password) {
            showMessage('Please enter your password.');
            passwordInput.focus();
            return false;
        }

        // Check password length
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters.');
            passwordInput.focus();
            return false;
        }

        return true;
    }

    // Handle Form Submit
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate form
        if (!validateForm(username, password)) {
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            // Simulate API call
            const response = await loginUser(username, password);
            
            if (response.success) {
                // Success
                showMessage('Login successful! Redirecting...', 'success');
                
                // Store user data (in production, use secure storage)
                sessionStorage.setItem('user', JSON.stringify(response.user));
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                throw new Error(response.message || 'Login failed');
            }

        } catch (error) {
            // Error
            console.error('Login error:', error);
            showMessage(error.message || 'Sorry, there was a problem with your request.');
            setLoadingState(false);
        }
    }

    // Set Loading State
    function setLoadingState(isLoading) {
        if (isLoading) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            usernameInput.disabled = true;
            passwordInput.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            updateLoginButton();
            usernameInput.disabled = false;
            passwordInput.disabled = false;
        }
    }

    // Login User (API Call Simulation)
    function loginUser(username, password) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Demo: Accept any credentials for testing
                // In production, this would be a real API call
                
                // Simulate different responses
                if (username === 'demo' && password === 'demo123') {
                    resolve({
                        success: true,
                        user: {
                            id: 1,
                            username: username,
                            email: 'demo@eyelix.com',
                            fullName: 'Demo User'
                        }
                    });
                } else if (username && password) {
                    // Accept any other credentials for demo
                    resolve({
                        success: true,
                        user: {
                            id: Math.floor(Math.random() * 1000),
                            username: username,
                            email: `${username}@example.com`,
                            fullName: username
                        }
                    });
                } else {
                    reject(new Error('Sorry, your password was incorrect. Please double-check your password.'));
                }
            }, 1500);
        });
    }

    // Handle Facebook Login
    function handleFacebookLogin() {
        console.log('Facebook login clicked');
        showMessage('This feature is coming soon.', 'error');
        
        // In production, implement Facebook OAuth flow
        // window.location.href = 'https://www.facebook.com/dialog/oauth?client_id=...';
    }

    // Showcase Slideshow Functions
    function startShowcaseSlideshow() {
        if (showcaseImages.length > 1) {
            slideInterval = setInterval(rotateShowcaseImages, 4000);
        }
    }

    function rotateShowcaseImages() {
        showcaseImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % showcaseImages.length;
        showcaseImages[currentImageIndex].classList.add('active');
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    });

    // Handle browser back button
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was loaded from cache
            setLoadingState(false);
            hideMessage();
        }
    });
});

// Utility Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function isValidUsername(username) {
    return username.length >= 3 && /^[a-zA-Z0-9._]+$/.test(username);
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        isValidUsername
    };
}