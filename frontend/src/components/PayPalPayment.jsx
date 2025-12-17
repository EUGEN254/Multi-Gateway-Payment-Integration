import React, { useState } from "react";
import { Building, Loader2 } from "lucide-react";
import axios from "axios";

const PayPalPayment = ({ product, onSuccess, onFailure, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [useSandbox, setUseSandbox] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1️⃣ Create simulated order
      const createRes = await axios.post(
        `${backendUrl}/api/paypal/create-order`,
        { amount: product.price, currency: "USD" },
        { withCredentials: true }
      );

      const orderID = createRes.data.id;
      if (!orderID) throw new Error("Failed to create simulated PayPal order");

      // 2️⃣ Capture simulated order
      const captureRes = await axios.post(
        `${backendUrl}/api/paypal/capture-order`,
        { orderID },
        { withCredentials: true }
      );

      if (captureRes.data && captureRes.data.capture) {
        onSuccess("PayPal", captureRes.data.capture);
      } else {
        onFailure("PayPal");
      }
    } catch (err) {
      console.error("PayPal payment error:", err);
      onFailure("PayPal");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-50 mr-3">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  PayPal Checkout
                </h2>
                <p className="text-sm text-gray-600">
                  Secure payment with PayPal (Sandbox)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{product.name}</span>
            <span className="text-xl font-bold">${product.price}</span>
          </div>
        </div>

        {/* PayPal Interface */}
        <div className="p-6">
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isProcessing ? "Processing Payment..." : "Ready to Pay"}
              </h3>
              <p className="text-gray-600 mb-4">
                {isProcessing
                  ? "Please wait while we process your simulated PayPal payment"
                  : "Click below to proceed with PayPal"}
              </p>

              {/* Sandbox Toggle */}
              <div className="flex items-center justify-center mb-6">
                <button
                  type="button"
                  onClick={() => setUseSandbox(!useSandbox)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
                  style={{
                    backgroundColor: useSandbox ? "#3B82F6" : "#9CA3AF",
                  }}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      useSandbox ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className="ml-3 text-sm text-gray-700">
                  {useSandbox ? "Sandbox Mode" : "Live Mode"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Building className="w-5 h-5 mr-2" />
                  Continue to PayPal
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPalPayment;
