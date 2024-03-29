import React from "react";
import styled from "styled-components";
import { ICategories } from "../data";
import { mobile } from "../utils/responsive";
import { Link } from "react-router-dom";

type CategoriesItemProps = {
    item: ICategories;
};

const CategoriesItem: React.FC<CategoriesItemProps> = ({ item }) => {
    return (
        <Container>
            <Link to={`/products/${item.category}`}>
                <Image src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button>Shop now</Button>
                </Info>
            </Link>
        </Container>
    );
};

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #8e7d7d;
    color: white;
  }
`;

export default CategoriesItem;
