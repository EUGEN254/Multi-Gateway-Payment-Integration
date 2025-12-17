import React, { useState } from "react";
import axios from "axios";
import { CreditCard, Lock, Loader2, ArrowLeft } from "lucide-react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const StripePayment = ({ product, onSuccess, onFailure, onBack, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // Create PaymentIntent on backend
      const res = await axios.post(
        backendUrl + "/api/stripe/create-payment-intent",
        { amount: product.price, name: product.name },
        { withCredentials: true }
      );

      const { clientSecret } = res.data;
      if (!clientSecret) throw new Error("No client secret returned from backend");

      // Confirm card payment using Stripe Elements
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: "Test User" }
        }
      });

      if (error) {
        console.error(error);
        onFailure(error.message);
      } else {
        onSuccess("Stripe Payment Successful!");
      }
    } catch (err) {
      console.error(err);
      onFailure("Stripe");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">Stripe Test Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 bg-gray-50 flex justify-between">
        <span>{product.name}</span>
        <span className="font-bold">${product.price}</span>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Stripe Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
          <div className="p-3 border border-gray-300 rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#9e2146' },
                }
              }}
            />
          </div>
        </div>

        {/* Info for testing */}
        <div className="flex items-center text-sm text-gray-600">
          <Lock className="w-4 h-4 mr-2 text-green-600" />
          Stripe TEST mode — use card 4242 4242 4242 4242 with any future date & CVC
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay ${product.price}
            </>
          )}
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back to Payment Methods
        </button>
      </form>
    </div>
  );
};

export default StripePayment;
