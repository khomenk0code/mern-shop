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
    id: string;
    title: string;
    desc: string;
    img: string;
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

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                    category
                        ? `http://localhost:5000/api/products?category=${category}`
                        : "http://localhost:5000/api/products"
                );
                setProducts(res.data);
            } catch (e) {
                console.error(e);
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

    return (
        <Container>
            {category
                ? filteredProducts.map((item: any) => (
                      <ProductsItem item={item} key={item._id} />
                  ))
                : products
                      .slice(0, 8)
                      .map((item: any) => (
                          <ProductsItem item={item} key={item._id} />
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
