const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Server-side validation endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Server-side validation logic
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' });
    }

    // If validation passes (this is a mock login)
    res.json({ success: true, message: 'Login successful!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
