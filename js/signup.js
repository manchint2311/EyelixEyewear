// Toggle Password Visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = this;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

// Form Validation
const signupForm = document.getElementById('signupForm');
const submitBtn = document.querySelector('.btn-signup');

function validateForm() {
    const email = document.getElementById('email').value;
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (email && fullname && username && password.length >= 6) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Add input event listeners
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', validateForm);
});

// Form Submit Handler
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        email: document.getElementById('email').value,
        fullname: document.getElementById('fullname').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    
    console.log('Form submitted:', formData);
    
    alert('Sign up functionality will be implemented here!');
});

// Facebook Login Handler
document.querySelector('.btn-facebook').addEventListener('click', function() {
    console.log('Facebook login clicked');
    alert('Facebook login functionality will be implemented here!');
});

// Initial validation
validateForm();
