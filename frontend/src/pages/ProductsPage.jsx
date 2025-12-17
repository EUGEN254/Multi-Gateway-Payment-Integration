import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  ShoppingCart, 
  Coffee, 
  Apple, 
  Beef, 
  Milk, 
  Package2, 
  Carrot,
  Package,
  CreditCard, 
  Lock, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Zap,
  Globe,
  Smartphone,
  Building,
  RefreshCw,
  Truck,
  Star
} from "lucide-react";
import PaymentModal from "./PaymentModal";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayClick = async (product) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    setSelectedProduct(product);
    setIsModalOpen(true);
    setIsLoading(false);
  };

  const handlePaymentSuccess = (gateway) => {
    toast.success(
      <div className="flex items-center">
        <CheckCircle className="mr-2 text-green-500" />
        <span>✅ Payment simulation successful via {gateway}! Order confirmed.</span>
      </div>
    );
    setIsModalOpen(false);
  };

  const handlePaymentFailure = (gateway) => {
    toast.error(
      <div className="flex items-center">
        <CreditCard className="mr-2 text-red-500" />
        <span>❌ Payment simulation failed via {gateway}. Try another method.</span>
      </div>
    );
    setIsModalOpen(false);
  };

  const products = [
    {
      id: 1,
      name: "Fresh Grocery Bundle",
      category: "Daily Essentials",
      price: 1,
      description: "Weekly essentials bundle including fruits, vegetables, and dairy",
      features: ["Fresh Produce", "Organic Options", "24hr Delivery", "Quality Guarantee"],
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      rating: 4.8,
      popular: true,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      stock: "In Stock",
      delivery: "Free Delivery"
    },
    {
      id: 2,
      name: "Premium Coffee Selection",
      category: "Beverages",
      price: 1,
      description: "Artisanal coffee beans from premium single-origin sources",
      features: ["Single Origin", "Fresh Roasted", "250g Pack", "Flavor Notes"],
      icon: <Coffee className="w-8 h-8 text-amber-600" />,
      rating: 1,
      popular: true,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      stock: "Limited Stock",
      delivery: "Same Day"
    },
    {
      id: 3,
      name: "Organic Fruit Basket",
      category: "Fresh Produce",
      price: 1,
      description: "Seasonal organic fruits handpicked for freshness and quality",
      features: ["100% Organic", "Seasonal Selection", "Nutrition Packed", "Farm Fresh"],
      icon: <Apple className="w-8 h-8 text-red-500" />,
      rating: 4.7,
      popular: false,
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
      stock: "In Stock",
      delivery: "Next Day"
    }
  ];

  const gateways = [
    { name: "Stripe", icon: <CreditCard className="w-5 h-5 text-indigo-600" /> },
    { name: "PayPal", icon: <Building className="w-5 h-5 text-blue-600" /> },
    { name: "Paystack", icon: <Globe className="w-5 h-5 text-green-600" /> },
    { name: "Flutterwave", icon: <Zap className="w-5 h-5 text-orange-600" /> },
    { name: "M-Pesa", icon: <Smartphone className="w-5 h-5 text-teal-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 mb-4">
            <ShoppingCart className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
              Payment Gateway Demo Store
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fresh Market Express
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            A demonstration e-commerce platform for testing multiple payment gateways. 
            Browse our grocery selection and experience seamless checkout with 5+ payment options.
          </p>
        </div>


        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${
                product.popular ? "border-green-200 ring-2 ring-green-100" : "border-gray-100"
              }`}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-semibold text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        {product.rating} • {product.stock}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                    {product.icon}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>

                {/* Features List */}
                <ul className="mb-6 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 text-sm">
                      <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Delivery Info */}
                <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Truck size={16} className="text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-700">{product.delivery}</span>
                    </div>
                    <span className="text-xs text-gray-500">Delivery included</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Demo Price</span>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                        <span className="text-gray-500 ml-1">/item</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Test multiple</div>
                      <div className="text-sm font-semibold text-blue-600">Payment Methods</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePayClick(product)}
                    disabled={isLoading}
                    className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center ${
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
          ))}
        </div>

        {/* Demo Instructions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-100 to-indigo-100 mr-4">
                <RefreshCw className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Test Payment Gateways</h3>
                <p className="text-gray-600">Simulate checkout with different payment methods</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gateways.map((gateway, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gray-50 mr-3">
                      {gateway.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{gateway.name}</div>
                      <div className="text-xs text-gray-500">Click any product to test</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testing Information */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 text-blue-600 mr-3" />
              How to Test Payment Gateways
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Select a Product</h4>
                    <p className="text-gray-600 text-sm">Choose any grocery item from our demo store</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Choose Payment Method</h4>
                    <p className="text-gray-600 text-sm">Select from 5+ payment gateways (sandbox mode)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Simulate Checkout</h4>
                    <p className="text-gray-600 text-sm">Experience the payment flow without real charges</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Review Results</h4>
                    <p className="text-gray-600 text-sm">Get immediate feedback on payment status</p>
                  </div>
                </div>
              </div>
            </div>
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

        {/* Demo Notice */}
        <div className="mt-12 text-center text-gray-500 text-sm max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-semibold text-gray-700">Demo Store Notice</span>
            </div>
            <p className="text-gray-600">
              This is a demonstration grocery store for testing payment gateway integrations. 
              All products and transactions are simulated using sandbox credentials. 
              No real purchases are made and no real money changes hands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;