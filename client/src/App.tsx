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
import { useAppSelector } from "./hooks/hooks";
import styled from "styled-components";
import Aside from "./components/aside.component";
import Header from "./components/header.component";
import Wishlist from "./pages/wishlist";
import ScrollToTop from "./components/scroll-to-top";

const App = () => {
    const user = useAppSelector((state) => state.user.currentUser);
    return (
        <Router>
                <ScrollToTop/>
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
                <Route path="/cabinet/*" element={<CabinetRoutes />}/>
            </Routes>
        </Router>
    );
};


const CabinetRoutes = () => (
    <Container>
           <Header/>
            <Wrapper>
                <Aside/>
                <Routes>
                    <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
            </Wrapper>
        </Container>
);

const Container = styled.div`
display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
display: flex;
`;

export default App;
