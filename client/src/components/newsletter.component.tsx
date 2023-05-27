import React from 'react';
import styled from "styled-components";
import {Send} from "@mui/icons-material";
import {mobile} from "../utils/responsive";




const Newsletter:React.FC  = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get timely updates from your favorite products</Description>
            <InputContainer>
                <Input placeholder="Your email"></Input>
                <Button>
                    <Send/>
                </Button>
            </InputContainer>
        </Container>

    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fcf5f5;
  align-items: center;
  flex-direction: column;
  margin: 3rem 0;
`

const Title = styled.h2`
font-size: 70px;
  margin-top: 5rem;
  margin-bottom: 1.5rem;
  ${mobile({ fontSize: "55px" })}
  
`

const Description = styled.p`
    font-size: 24px;
  font-weight: 300;
  margin-bottom: 2rem;
  ${mobile({ textAlign: "center" })}
`
const InputContainer = styled.div`
  width: 50%;
  height: 3rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border: 1px solid #d3d3d3;
  align-items: center;
  margin-bottom: 8rem;
  ${mobile({ width: "80%" })}
`
const Input = styled.input`
border: none;
  flex: 8;
  height: 100%;
  font-size: 22px;
  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  background-color: #008080;
  color: #fff;
  cursor: pointer;
`

export default Newsletter;
