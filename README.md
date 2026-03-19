# Juice Shop Login Mimic

This project is a simple implementation of a login form that mimics the OWASP Juice Shop login page. It includes both client-side and server-side validation.

## Features

*   **HTML Structure**: A basic login form with email and password fields.
*   **CSS Styling**: Styles to resemble the clean look of the Juice Shop login page.
*   **Client-Side Validation (JavaScript)**:
    *   Checks if fields are empty.
    *   Verifies that the email contains an "@" symbol.
    *   Ensures the password is at least 8 characters long.
*   **Server-Side Validation (Node.js/Express)**:
    *   Re-validates the input data on the server to ensure security.
    *   Returns success or error messages based on validation results.

## Prerequisites

*   Node.js and npm installed.

## Installation and Setup

1.  Navigate to the project directory:
    ```bash
    cd juice-shop-login-mimic
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the server:
    ```bash
    node server.js
    ```

4.  Open your browser and go to:
    `http://localhost:3000`

## Implementation Details

The project consists of a static frontend (`index.html`, `style.css`, `script.js`) served by an Express backend (`server.js`). The frontend handles initial user feedback, while the backend ensures data integrity before processing (mock processing in this case).

## Validation Logic

*   **Email**: Must be non-empty and contain "@".
*   **Password**: Must be non-empty and have a minimum length of 8 characters.
