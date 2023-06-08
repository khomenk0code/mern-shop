import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import HeaderComponent from "./components/header.component";
import styled from "styled-components";
import Sidebar from "./components/aside.component";
import Home from "./pages/home.page";
import UserList from "./pages/user-list.page";
import User from "./pages/user.page";
import NewUser from "./pages/new-user.page";
import ProductList from "./pages/product-list.page";
import Product from "./pages/product.page";
import NewProduct from "./pages/new-product.page";
import Transactions from "./pages/transactions.page";
import Reports from "./pages/reports.page";
import Login from "./pages/login.page";

const App = () => (
    <Router>
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<ContainedRoutes />} />
            </Routes>
        </>
    </Router>
);

const ContainedRoutes = () => (
  <>
      <HeaderComponent />
          <Container>
              <Sidebar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/user/:userId" element={<User />} />
                  <Route path="/user/add" element={<NewUser />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/product/add" element={<NewProduct />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/reports" element={<Reports />} />
              </Routes>
          </Container>
  </>
);

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

export default App;