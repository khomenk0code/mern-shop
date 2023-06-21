import React from 'react';
import styled from "styled-components";
import Header from "../components/header.component";
import Aside from "../components/aside.component";



const Cabinet: React.FC = () => {
    return (
        <Container>
           <Header/>
            <Wrapper>
                <Aside/>
                <Main>123</Main>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
display: flex;
  flex-direction: column;
`;
const Main = styled.div`
display: flex;
  flex: 4;
`;
const Wrapper = styled.div`
display: flex;
`;

export default Cabinet;
