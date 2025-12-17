Multi-Gateway Payment Integration

    This project demonstrates integration of multiple payment gateways (Stripe and PayPal) in a React + Express application.
    It is fully sandboxed/test-only, meaning no real money transactions are processed.

Table of Contents

    Technologies

    Setup

    Environment Variables

    Running the Project

    Usage

    Testing Payments

    Folder Structure

Technologies

    Frontend: React, TailwindCSS, Lucide Icons, Axios

    Backend: Node.js, Express, Stripe, PayPal SDK, dotenv, Mongoose

Testing: Stripe sandbox, PayPal sandbox

Setup

    Clone the repository:

git clone <repo-url>
    cd multi-gateway-payments


Install dependencies:

# Backend
    cd backend
    npm install

# Frontend
    cd ../frontend
    npm install

    Environment Variables

    Create a .env file in the backend folder:

    PORT=5000

# Stripe
    STRIPE_SECRET_KEY=sk_test_...

# PayPal Sandbox
    PAYPAL_CLIENT_ID=YOUR_PAYPAL_SANDBOX_CLIENT_ID
    PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_SANDBOX_CLIENT_SECRET


Create a .env file in the frontend folder:

    VITE_BACKEND_URL=http://localhost:5000
    VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
    VITE_PAYPAL_CLIENT_ID=YOUR_PAYPAL_SANDBOX_CLIENT_ID


Replace the keys with your own Stripe and PayPal sandbox credentials.

Running the Project

Backend:

cd backend
    npm run server   # or npm start


Server will run at: http://localhost:5000

Frontend:

    cd frontend
    npm run dev


Frontend will run at: http://localhost:5173

Usage

    Open the frontend in your browser.

    Select a product and choose a payment method (Stripe or PayPal).

    For PayPal, sandbox mode is enabled; you can toggle between sandbox and live in your code.

    Click Pay to simulate the payment flow.

Testing Payments

    Stripe: Sandbox payments work with any valid card, e.g., 4242 4242 4242 4242.

    PayPal: Use sandbox accounts (found in your PayPal developer dashboard).

⚠️ All PayPal captures are simulated in the backend; no real transactions occur.

    Folder Structure
    multi-gateway-payments/
    ├── backend/
    │   ├── package.json
    │   ├── package-lock.json
    │   └── server.js
    ├── frontend/
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── public/
    │   │   └── vite.svg
    │   ├── README.md
    │   ├── src/
    │   │   ├── App.jsx
    │   │   ├── assets/
    │   │   │   └── react.svg
    │   │   ├── components/
    │   │   │   ├── FlutterwavePayment.jsx
    │   │   │   ├── MpesaPayment.jsx
    │   │   │   ├── PayPalPayment.jsx
    │   │   │   ├── PaystackPayment.jsx
    │   │   │   └── StripePayment.jsx
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   └── pages/
    │   │       ├── PaymentModal.jsx
    │   │       └── ProductsPage.jsx
    │   └── vite.config.js
    └── README.md

Notes

    This README is sandbox/test-focused.

    When moving to production:

    Replace PayPal sandbox keys with live credentials.

    Replace Stripe test keys with live keys.

    Remove any simulated logic in the backend.