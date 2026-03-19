const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Security Middleware: Helmet sets various HTTP headers for security
// This helps prevent XSS by setting Content-Security-Policy
app.use(helmet());

// Content Security Policy (CSP) configuration
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"], // Only allow scripts from the same origin
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (for simplicity in this demo)
    },
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Initialize SQLite Database (In-Memory for demo purposes)
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create users table
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");

    // Insert a dummy admin user
    // We use a prepared statement here too, even for setup
    const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    stmt.run("admin@juice-sh.op", "admin123");
    stmt.finalize();
});

// Login endpoint with Server-side validation and SQL Injection prevention
app.post('/login', [
    // Sanitize and validate email
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    // Sanitize password
    // escaping characters like <, >, &, ', " to HTML entities to prevent XSS if displayed
    body('password').isLength({ min: 8 }).trim().escape().withMessage('Password must be at least 8 characters long')
], (req, res) => {
    
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    // Parameterized Query to prevent SQL Injection
    // The '?' placeholders ensure that inputs are treated as data, not executable code.
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.get(query, [email, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        if (row) {
            // In a real app, you would issue a JWT or session here
            res.json({ success: true, message: 'Login successful! Welcome back, ' + row.email });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
