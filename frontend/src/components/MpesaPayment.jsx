import React, { useState } from "react";
import { Smartphone, Loader2, Phone, ArrowLeft } from "lucide-react";

const MpesaPayment = ({ product, onSuccess, onFailure, onBack, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("0712 345 678");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate M-Pesa STK Push
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 70% success rate for demo
    if (Math.random() > 0.3) {
      onSuccess("M-Pesa");
    } else {
      onFailure("M-Pesa");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
      {/* Header with Back Button */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-teal-50 mr-3">
              <Smartphone className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">M-Pesa Payment</h2>
              <p className="text-sm text-gray-600">Enter your phone number</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            ✕
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 bg-gradient-to-r from-teal-50 to-emerald-50">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{product.name}</span>
          <span className="text-xl font-bold">KSh {product.price * 100}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">(${product.price})</p>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              placeholder="07XX XXX XXX"
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Enter your Safaricom number to receive payment prompt
          </p>
        </div>

        {/* M-Pesa Instructions */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Enter your phone number above</li>
            <li>2. You'll receive an STK Push notification</li>
            <li>3. Enter your M-Pesa PIN on your phone</li>
            <li>4. Payment will be confirmed automatically</li>
          </ol>
        </div>

        {/* Test Info */}
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Smartphone className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-semibold">Demo Mode:</span> This simulates M-Pesa payment flow. No actual SMS will be sent.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Sending Payment Request...
              </>
            ) : (
              <>
                <Smartphone className="w-5 h-5 mr-2" />
                Pay with M-Pesa
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 text-gray-600 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back to Payment Methods
          </button>
        </div>
      </form>
    </div>
  );
};

export default MpesaPayment;