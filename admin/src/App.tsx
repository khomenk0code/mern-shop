import React from "react";
import HeaderComponent from "./components/header.component";
import styled from "styled-components";
import Sidebar from "./components/aside.component";
import Home from "./pages/home.page";

function App() {
    return (
        <>
            <HeaderComponent />
                <Container>
                    <Sidebar/>
                    <Home/>
                </Container>
        </>
    );
}

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`

export default App;
