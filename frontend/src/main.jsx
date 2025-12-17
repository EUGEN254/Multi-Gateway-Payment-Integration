import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
          currency: "USD",
        }}
      >
        <App />
      </PayPalScriptProvider>
    </Elements>
  </StrictMode>
);
