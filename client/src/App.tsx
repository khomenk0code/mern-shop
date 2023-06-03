import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import React from "react";
import Home from "./pages/home.page";
import ProductList from "./pages/product-list.page";
import Product from "./pages/product.page";
import Cart from "./pages/cart.page";
import Login from "./pages/login.page";
import Register from "./pages/register.page";

const App = () => {
    const user = true;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products/:category" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
            </Routes>
        </Router>
    );
};

export default App;
