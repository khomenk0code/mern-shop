import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/header.component";
import styled from "styled-components";
import Sidebar from "./components/aside.component";
import Home from "./pages/home.page";
import UserList from "./pages/user-list.page";
import User from "./pages/user.page";

function App() {
    return (
        <Router>
            <>
                <HeaderComponent />
                <Container>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/user/:userId" element={<User />} />
                    </Routes>
                </Container>
            </>
        </Router>
    );
}

const Container = styled.div`
    display: flex;
    margin-top: 10px;
`;

export default App;
