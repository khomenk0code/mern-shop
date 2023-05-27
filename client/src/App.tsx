import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/home.page";
import ProductList from "./pages/product-list.page";
import Product from "./pages/product.page";
import Cart from "./pages/cart.page";
import Login from "./pages/login.page";
import Register from "./pages/register.page";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
};

export default App;
