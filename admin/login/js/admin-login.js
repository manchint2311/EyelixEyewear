document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('adminLoginForm');
    const loginMessage = document.getElementById('loginMessage');
    const loginButton = loginForm.querySelector('.btn-login');
    const btnText = loginButton.querySelector('.btn-text');
    const btnLoader = loginButton.querySelector('.btn-loader');

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Validate inputs
        if (!username || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);
        hideMessage();

        // Simulate API call (replace with actual authentication)
        setTimeout(() => {
            // Demo credentials (replace with actual API call)
            if (username === 'admin' && password === 'admin123') {
                // Success
                showMessage('Login successful! Redirecting...', 'success');
                
                // Store session (if remember me is checked)
                if (remember) {
                    localStorage.setItem('adminRemember', 'true');
                    localStorage.setItem('adminUsername', username);
                }
                
                // Redirect to admin dashboard
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1500);
            } else {
                // Error
                showMessage('Invalid username or password', 'error');
                setLoadingState(false);
            }
        }, 1500);
    });

    // Show/hide message
    function showMessage(text, type) {
        loginMessage.textContent = text;
        loginMessage.className = `form-message ${type}`;
        loginMessage.style.display = 'block';
    }

    function hideMessage() {
        loginMessage.style.display = 'none';
    }

    // Set loading state
    function setLoadingState(isLoading) {
        loginButton.disabled = isLoading;
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';
        } else {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    // Check if user should be remembered
    if (localStorage.getItem('adminRemember') === 'true') {
        document.getElementById('remember').checked = true;
        const savedUsername = localStorage.getItem('adminUsername');
        if (savedUsername) {
            document.getElementById('username').value = savedUsername;
        }
    }

    // Password visibility toggle (optional enhancement)
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });

    // Input field animation on focus
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
