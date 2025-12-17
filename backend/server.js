// ======================
// Load environment vars
// ======================
import dotenv from "dotenv";
dotenv.config();

// ======================
// Core imports
// ======================
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import paypal from "@paypal/checkout-server-sdk";

// ======================
// Stripe
// ======================
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ======================
// App setup
// ======================
const app = express();
const PORT = process.env.PORT || 5000;

// PayPal environment
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);

// Create PayPal HTTP client
const client = new paypal.core.PayPalHttpClient(environment);

// ======================
// Middlewares
// ======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ======================
// Health check
// ======================
app.get("/", (req, res) => {
  res.json({ status: "Server running ✅" });
});

// ======================
// STRIPE PAYMENT INTENT
// ======================
app.post("/api/stripe/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "usd" } = req.body; // currency must be usd

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, //stripe expects cents, not dollars
      currency,
      automatic_payment_methods: { enabled: true }, //stripe handle card types automatically(visa,mastercard)
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// app.post("/api/orders",async (req,res) => {
//   const{paymentIntent} = req.body;

//   app.post("/api/orders", async (req, res) => {
//   const { paymentIntent } = req.body;

//   const { id, amount, currency, status, payment_method, created } = paymentIntent;

//   await Order.create({
//     paymentId: id,
//     amount: amount / 100,
//     currency,
//     status,
//     paymentMethodId: payment_method,
//     createdAt: new Date(created * 1000)
//   });

//   res.json({ success: true });
// });

// })

// ======================
// SIMULATED PAYPAL (sandbox only)
// ======================
app.post("/api/paypal/create-order", async (req, res) => {
  const { amount, currency = "USD" } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      { amount: { currency_code: currency, value: amount.toString() } },
    ],
  });

  try {
    const order = await client.execute(request); // Call PayPal API
    res.json({ id: order.result.id }); // Send order ID to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PayPal order creation failed" });
  }
});

// ======================
// Capture PayPal Order
// ======================
app.post("/api/paypal/capture-order", async (req, res) => {
  const { orderID } = req.body;
  if (!orderID) return res.status(400).json({ error: "orderID is required" });

  // Fake capture for sandbox testing
  res.json({
    id: orderID,
    status: "COMPLETED",
    amount: "1.00",
    currency: "USD",
  });
});




// ======================
// mpesa intergration
// ======================

// ======================
// Start server
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
