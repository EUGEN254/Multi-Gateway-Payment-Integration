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
      amount: amount * 100,//stripe expects cents, not dollars
      currency,
      automatic_payment_methods: { enabled: true },//stripe handle card types automatically(visa,mastercard)
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
app.post("/api/paypal/create-order", (req, res) => {
  const { amount, currency = "USD" } = req.body;

  // Simulate a PayPal order ID
  const fakeOrderID = `PAYPAL-SANDBOX-${Math.floor(Math.random() * 1000000)}`;

  console.log(`Simulated PayPal order created: ${fakeOrderID} (${currency} ${amount})`);

  res.json({ id: fakeOrderID });
});

app.post("/api/paypal/capture-order", async (req, res) => {
  const { orderID } = req.body;

  if (!orderID) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  // Simulate capture always succeeding
  console.log(`Simulated PayPal capture for order ${orderID}: SUCCESS`);
  res.json({
    capture: {
      id: `CAPTURE-${orderID}`,
      status: "COMPLETED",
      amount: { currency_code: "USD", value: "1.00" },
    },
  });
});


// ======================
// Start server
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
