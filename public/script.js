document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginMessage = document.getElementById('loginMessage');

    // Reset error messages
    emailError.textContent = '';
    passwordError.textContent = '';
    loginMessage.textContent = '';
    loginMessage.className = 'login-message';

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Client-side validation
    let isValid = true;

    // Email validation
    if (!email) {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!email.includes('@')) {
        emailError.textContent = 'Email must contain "@".';
        isValid = false;
    }

    // Password validation
    if (!password) {
        passwordError.textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Prepare data for server
    const data = {
        email: email,
        password: password
    };

    // Send data to server for further validation
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loginMessage.textContent = data.message;
            loginMessage.classList.add('success');
            // Here you would typically redirect the user
            console.log('Login successful:', data);
        } else {
            loginMessage.textContent = data.message;
            loginMessage.classList.add('error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        loginMessage.textContent = 'An error occurred. Please try again later.';
        loginMessage.classList.add('error');
    });
});
