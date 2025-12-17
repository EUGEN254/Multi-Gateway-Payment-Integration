import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  ShoppingCart, 
  CreditCard, 
  CheckCircle, 
  Shield,
  Truck,
  Star,
  RefreshCw
} from "lucide-react";
import PaymentModal from "./PaymentModal";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayClick = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsLoading(false);
  };

  const handlePaymentSuccess = (gateway) => {
    toast.success(
      <div className="flex items-center">
        <CheckCircle className="mr-2 text-green-500" />
        <span>Payment successful via {gateway}! Order confirmed.</span>
      </div>
    );
    setIsModalOpen(false);
  };

  const handlePaymentFailure = (gateway) => {
    toast.error(
      <div className="flex items-center">
        <CreditCard className="mr-2 text-red-500" />
        <span>Payment failed via {gateway}. Try another method.</span>
      </div>
    );
    setIsModalOpen(false);
  };

  const product = {
    id: 1,
    name: "Fresh Grocery Bundle",
    category: "Daily Essentials",
    price: 1,
    description: "Weekly essentials bundle including fruits, vegetables, and dairy",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    delivery: "Free Delivery"
  };

  const gateways = [
    { name: "Stripe", icon: <CreditCard className="w-5 h-5 text-indigo-600" /> },
    { name: "PayPal", icon: <span className="text-blue-600 text-lg font-bold">Pay</span> },
    { name: "Paystack", icon: <span className="text-green-600 text-lg font-bold">P</span> },
    { name: "Flutterwave", icon: <span className="text-orange-600 text-lg font-bold">F</span> },
    { name: "M-Pesa", icon: <span className="text-teal-600 text-lg font-bold">M</span> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 mb-4">
            <ShoppingCart className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-semibold text-green-700">
              Payment Gateway Demo
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Fresh Market Express
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test payment gateways with this demo product. Experience checkout with multiple payment options.
          </p>
        </div>

        {/* Single Product Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-2/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-3/5 p-6">
              <div className="mb-4">
                <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {product.name}
              </h2>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">{product.rating}/5</span>
              </div>

              <p className="text-gray-600 mb-5">
                {product.description}
              </p>

              {/* Delivery Info */}
              <div className="mb-5 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <Truck size={18} className="text-green-600 mr-2" />
                  <span className="font-medium text-green-700">{product.delivery}</span>
                </div>
              </div>

              {/* Price and Button */}
              <div className="border-t pt-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-sm text-gray-500">Demo Price</div>
                    <div className="text-3xl font-bold text-gray-900">${product.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Test all</div>
                    <div className="font-semibold text-blue-600">Payment Methods</div>
                  </div>
                </div>

                <button
                  onClick={handlePayClick}
                  disabled={isLoading}
                  className={`w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Preparing Checkout...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} className="mr-2" />
                      Test Checkout Process
                    </>
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-3">
                  Click to test all available payment gateways
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="mb-10">
          <div className="bg-gray-50 rounded-xl p-6 border">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-blue-100 mr-3">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Test Payment Gateways</h3>
                <p className="text-gray-600">Simulate checkout with different methods</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {gateways.map((gateway, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border text-center">
                  <div className="flex justify-center mb-2">
                    {gateway.icon}
                  </div>
                  <div className="font-medium text-gray-900">{gateway.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Test */}
        <div className="mb-10">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
              <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
              How to Test
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Click the checkout button</h4>
                  <p className="text-gray-600 text-sm">Start the payment process</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Choose a payment method</h4>
                  <p className="text-gray-600 text-sm">Select from available gateways</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                  <span className="text-blue-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Simulate payment</h4>
                  <p className="text-gray-600 text-sm">Test success or failure scenarios</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="text-center">
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 inline-block">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-medium text-gray-700">Demo Notice</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              This is a demonstration for testing payment gateways. 
              No real purchases are made and no real money changes hands.
            </p>
          </div>
        </div>

        {/* Payment Modal */}
        {isModalOpen && selectedProduct && (
          <PaymentModal
            product={selectedProduct}
            onSuccess={handlePaymentSuccess}
            onFailure={handlePaymentFailure}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default ProductsPage;