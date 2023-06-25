import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsItem from "./products.item";
import axios from "axios";

interface Filters {
    color?: string;
    size?: string;
}

interface ProductsProps {
    category?: string;
    filters?: Filters;
    sort?: string;
}

export interface IProduct {
    quantity: number;
    id: string;
    _id: string;
    title: string;
    desc: string;
    img: string;
    altImg: string;
    categories?: string[];
    size: string[];
    color: string[];
    price: number;
    createdAt: number;
    updatedAt: number;
    inStock: boolean;
}

const Products: React.FC<ProductsProps> = ({ category, filters, sort }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [visibleProductCount, setVisibleProductCount] = useState<number>(8);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const BASE_URL = "https://mern-shop-api.vercel.app/api";

    useEffect(() => {
        const getProducts = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    category
                        ? `${BASE_URL}/products?category=${category}`
                        : `${BASE_URL}/products`
                );
                setProducts(res.data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };
        getProducts();
    }, [category]);

    useEffect(() => {
        category &&
        setFilteredProducts(
            products.filter((item: any) =>
                Object.entries(filters as Filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        );
    }, [products, category, filters]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    const handleShowMore = () => {
        setVisibleProductCount((prevCount) => prevCount + visibleProductCount);
    };

    return (
 <>
     <Container>
         {(category ? filteredProducts : products)
             .slice(0, visibleProductCount)
             .map((item: any) => (
                 <ProductsItem item={item} key={item._id} />
             ))}
         {isLoading && <Loader>Loading...</Loader>}
     </Container>
     <ButtonWrapper>
         {visibleProductCount < (category ? filteredProducts.length : products.length) && !isLoading && (
             <ShowMoreButton onClick={handleShowMore}>Show more</ShowMoreButton>
         )}
     </ButtonWrapper>
 </>
    );
};

const Container = styled.div`
  margin: 3rem 0;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-weight: bold;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;



const ShowMoreButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #eceff3;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Products;
