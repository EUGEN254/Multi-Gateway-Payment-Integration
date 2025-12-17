import React, { useState } from "react";
import {
  CreditCard,
  Building,
  Smartphone,
  Globe,
  X,
  Lock,
  Check,
  Sparkles,
  Shield,
  Loader2,
  Zap,
  Banknote,
  Phone,
  AlertCircle,
} from "lucide-react";

// Import your gateway components

import MpesaPayment from "../components/MpesaPayment";
import PayPalPayment from "../components/PayPalPayment";
import StripePayment from "../components/StripePayment";

const PaymentModal = ({ product, onSuccess, onFailure, onClose }) => {
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [activeGateway, setActiveGateway] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment gateways with professional icons
  const gateways = [
    {
      name: "Stripe",
      description: "Credit & Debit Cards",
      icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
    {
      name: "PayPal",
      description: "PayPal & Venmo",
      icon: <Building className="w-6 h-6 text-blue-600" />,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      name: "M-Pesa",
      description: "Mobile Money",
      icon: <Smartphone className="w-6 h-6 text-teal-600" />,
      color: "from-teal-500 to-teal-700",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
    },
  ];

  // Handle click on gateway - show specific gateway component
  const handleGatewayClick = (gateway) => {
    setSelectedGateway(gateway);
    setActiveGateway(gateway.name);
  };

  // Handle going back to gateway selection
  const handleBackToSelection = () => {
    setActiveGateway(null);
    setSelectedGateway(null);
    setIsProcessing(false);
  };

  // Handle payment success from gateway component
  const handleGatewaySuccess = (gatewayName) => {
    onSuccess(gatewayName);
  };

  // Handle payment failure from gateway component
  const handleGatewayFailure = (gatewayName) => {
    onFailure(gatewayName);
  };

  // Render the specific gateway component based on activeGateway
  const renderGatewayComponent = () => {
    switch (activeGateway) {
      case "Stripe":
        return (
          <StripePayment
            product={product}
            onSuccess={handleGatewaySuccess}
            onFailure={handleGatewayFailure}
            onBack={handleBackToSelection}
            onClose={onClose}
          />
        );
      case "M-Pesa":
        return (
          <MpesaPayment
            product={product}
            onSuccess={handleGatewaySuccess}
            onFailure={handleGatewayFailure}
            onBack={handleBackToSelection}
            onClose={onClose}
          />
        );
      case "PayPal":
        return (
          <PayPalPayment
            product={product}
            onSuccess={handleGatewaySuccess}
            onFailure={handleGatewayFailure}
            onBack={handleBackToSelection}
            onClose={onClose}
          />
        );
      default:
        return renderGatewaySelection();
    }
  };

  // Render the gateway selection screen
  const renderGatewaySelection = () => {
    return (
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-scroll animate-fadeIn max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center mb-2">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Demo Payment
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Test Payment Gateway
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Product Summary */}
        <div className="p-6 border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-900">
              {product.name}
            </span>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="mt-2 text-xs text-gray-500">
            ⚠️ This is a demo transaction. No real money will be charged.
          </div>
        </div>

        {/* Gateway Selection */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Lock className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Select Payment Method
            </h3>
          </div>

          <div className="space-y-3 mb-6">
            {gateways.map((gateway) => (
              <button
                key={gateway.name}
                onClick={() => handleGatewayClick(gateway)}
                disabled={isProcessing}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between hover:scale-[1.02] hover:shadow-lg ${
                  selectedGateway?.name === gateway.name
                    ? `border-blue-500 bg-linear-to-r ${gateway.color} bg-opacity-10`
                    : "border-gray-200 hover:border-gray-300"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${gateway.bgColor} mr-4`}>
                    {gateway.icon}
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${gateway.textColor}`}>
                      {gateway.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {gateway.description}
                    </div>
                  </div>
                </div>
                {selectedGateway?.name === gateway.name && (
                  <div
                    className={`p-2 rounded-full bg-linear-to-r ${gateway.color}`}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">How to test:</span> Click any
                  payment method to see its specific interface and simulate the
                  payment flow.
                </p>
              </div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              <span>Sandbox Mode</span>
            </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 mr-2 text-blue-600" />
              <span>Test Credentials</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto">
      {renderGatewayComponent()}
    </div>
  );
};

export default PaymentModal;
