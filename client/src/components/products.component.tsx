import React from 'react';
import styled from "styled-components";
import {IPopularProducts, popularProducts} from "../data";
import ProductsItem from "./products.item";



const Products: React.FC = () => {
    return (
        <Container>
            {popularProducts.map((item: IPopularProducts) => (
                <ProductsItem item={item} key={item.id}/>
            ))}
        </Container>
    );
};

const Container = styled.div`
  margin: 3rem 0;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default Products;
