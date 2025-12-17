import React from "react";
import { ToastContainer, toast } from "react-toastify";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  return (
    <div>
      <ToastContainer />

      <ProductsPage />
    </div>
  );
};

export default App;
