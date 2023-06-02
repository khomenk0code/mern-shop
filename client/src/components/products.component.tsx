import React from "react";
import styled from "styled-components";
import { IPopularProducts, popularProducts } from "../data";
import ProductsItem from "./products.item";

interface Filters {
  color?: string;
  size?: string;
}

interface ProductsProps {
  category?: string;
  filters?: Filters;
  sort?: string;
}

const Products: React.FC<ProductsProps> = ({ category, filters, sort }) => {
  console.log(category, filters, sort);
  return (
    <Container>
      {popularProducts.map((item: IPopularProducts) => (
        <ProductsItem item={item} key={item.id} />
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
`;

export default Products;
