import React from 'react';

import styled from "styled-components";
import {IPopularProducts} from "../data";
import {FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import {StyledLink} from "./header.component";

type CategoriesItemProps = {
    item: IPopularProducts
}



const ProductsItem: React.FC<CategoriesItemProps> = ({item}) => {
    return (
        <Container>
            <Circle/>
            <Image src={item.img}/>
            <Info>
                <Icon>
                    <StyledLink to="/product"><SearchOutlined/></StyledLink>
                </Icon>
                <Icon>
                    <ShoppingCartOutlined/>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlined/>
                </Icon>
            </Info>
        </Container>
    );
};
const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.1);
  display: flex;
  z-index: 3;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #eceff3;
  z-index: 2;

  &:hover ${Info} {
    opacity: 1;
  }

`
const Circle = styled.div`
width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #000;
  position: absolute;
`

const Icon = styled.div`
width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .5rem;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
    
  }
`
const Image = styled.img`
height: 75%;
  z-index: 2;
`


export default ProductsItem;
