import React from 'react';
import styled from "styled-components";
import {Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter} from "@mui/icons-material";
import {mobile} from "../utils/responsive";


const Footer:React.FC  = () => {
    return (
        <Container>
            <Left>
                <Logo>MERN.</Logo>
                <Description>
                    Welcome to our MERN Clothing Store!

                    At MERN Clothing, we offer a wide range of stylish and trendy clothing options for men, women, and children. Our store is dedicated to providing you with high-quality garments that not only look great but also make you feel confident and comfortable.
                </Description>
                <SocialContainer>
                    <SocialIcon color="3b5999"><Facebook/></SocialIcon>
                    <SocialIcon color="E4405F"><Instagram/></SocialIcon>
                    <SocialIcon color="55ACEE"><Twitter/></SocialIcon>
                    <SocialIcon color="E60023"><Pinterest/></SocialIcon>
                </SocialContainer>
            </Left>
                <Center>
                    <Title>Useful Links</Title>
                    <List>
                        <ListItem>Home</ListItem>
                        <ListItem>Cart</ListItem>
                        <ListItem>Man Fashion</ListItem>
                        <ListItem>Woman Fashion</ListItem>
                        <ListItem>Accessories</ListItem>
                        <ListItem>My Account</ListItem>
                        <ListItem>Order Tracking</ListItem>
                        <ListItem>Wishlist</ListItem>
                        <ListItem>Wishlist2</ListItem>
                        <ListItem>Terms</ListItem>
                    </List>
                </Center>
                <Right>
                    <Title>Contact</Title>
                    <ContactItem>
                        <Room style={{marginRight: "10px"}}/>
                        123 Main Street, Anytown, California, 12345
                    </ContactItem>
                    <ContactItem>
                        <Phone style={{marginRight: "10px"}}/>
                    +1 235 89 78
                    </ContactItem>
                    <ContactItem>
                        <MailOutline style={{marginRight: "10px"}}/>
                        contact@mern.dev
                    </ContactItem>
                    <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
                </Right>
        </Container>

    );
};

const Container = styled.footer`
  margin-top: 4rem;
  display: flex;
  ${mobile({ flexDirection: "column" })}

`

const Left = styled.div`
flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
`
const Logo = styled.h2`

`
const Description = styled.p`
margin: 2rem 0;
`
const SocialContainer = styled.div`
  display: flex;
  ${mobile({ justifyContent: "center" })}
`
const SocialIcon = styled.div`
width: 3rem;
  height: 3rem;
  border-radius: 50%;
  color: #fff;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  cursor: pointer;
  
`

const Center = styled.div`
  flex: 1;
  padding: 1.5rem;
  ${mobile({ display: "none" })}

`

const Title = styled.h3`
  margin-bottom: 2rem;
`

const List = styled.ul`
margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  width: 50%;
  margin-bottom: .5rem;
`

const Right = styled.div`
  flex: 1;
  padding: 1.5rem;
  ${mobile({ backgroundColor: "#fff8f8" })}

`
const ContactItem = styled.div`
    margin-bottom: 1rem;
  display: flex;
  align-items: center;
`
const Payment = styled.img`
    width: 50%;
  ${mobile({ marginBottom: "2rem" })}
`

export default Footer;

