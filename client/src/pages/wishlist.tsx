import React, { useState } from 'react';
import styled from "styled-components";
import { Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, Checkbox } from "@mui/material";
import { DeleteOutline, AddShoppingCart } from "@mui/icons-material";

// Пример данных для отображения товаров
const products = [
    {
        id: 1,
        title: "Product 1",
        desc: "Description of Product 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjf8KEchalHXDschnJIH0wZGSC9iM5BuSLZQ&usqp=CAU",
        price: 10.99,
    },
    {
        id: 2,
        title: "Product 2",
        desc: "Description of Product 2",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzDjA6T24POBsgn2r9-iKloRh4-YywtGhDQ&usqp=CAU",
        price: 19.99,
    },
    // Дополнительные продукты...
];



const Wishlist: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);



    const handleRemoveFromWishlist = (id: number) => {
        console.log("Remove from wishlist:", id);
    };

    const handleAddAllToCart = () => {
        console.log("Add all to cart:", selectedProducts);
        setSelectedProducts([]); // Очистить выбранные продукты после добавления в корзину
        setSelectedTotalPrice(0); // Сбросить общую сумму выбранных товаров
    };

    const handleRemoveAll = () => {
        console.log("Remove all from wishlist");
        setSelectedProducts([]); // Очистить выбранные продукты после удаления из избранного
        setSelectedTotalPrice(0); // Сбросить общую сумму выбранных товаров
    };

    const handleToggleAll = () => {
        if (selectedProducts.length === products.length) {
            // Если все товары уже выбраны, снять выделение со всех
            setSelectedProducts([]);
            setSelectedTotalPrice(0);
            setIsAllSelected(false)
        } else {
            // Выделить все товары
            const allProductIds = products.map((product) => product.id);
            setSelectedProducts(allProductIds);
            calculateSelectedTotalPrice(allProductIds);
            setIsAllSelected(true)

        }
    };

    const handleToggleProduct = (id: number) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.includes(id)) {
                const updatedSelectedProducts = prevSelectedProducts.filter((productId) => productId !== id);
                calculateSelectedTotalPrice(updatedSelectedProducts);
                return updatedSelectedProducts;
            } else {
                const updatedSelectedProducts = [...prevSelectedProducts, id];
                calculateSelectedTotalPrice(updatedSelectedProducts);
                return updatedSelectedProducts;
            }
        });
    };

    const calculateSelectedTotalPrice = (selectedProductIds: number[]) => {
        const totalPrice = selectedProductIds.reduce((total, productId) => {
            const product = products.find((product) => product.id === productId);
            return total + (product ? product.price : 0);
        }, 0);
        setSelectedTotalPrice(totalPrice);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Wishlist
            </Typography>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard>
                            <DeleteButton onClick={() => handleRemoveFromWishlist(product.id)}>
                                <DeleteOutline />
                            </DeleteButton>
                            <ProductImage image={product.img} />
                            <CardContent>
                                <ProductTitle variant="h6">{product.title}</ProductTitle>
                                <ProductDescription>{product.desc}</ProductDescription>
                                <ProductPrice variant="subtitle1">${product.price}</ProductPrice>
                                <Button variant="contained" color="primary">
                                    <AddShoppingCart /> Buy
                                </Button>

                                <Checkbox
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleToggleProduct(product.id)}
                                />
                            </CardContent>
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" onClick={handleToggleAll}>
                {selectedProducts.length === products.length ? "Deselect All" : "Select All"}
            </Button>

            {isAllSelected && (<Button variant="contained" color="primary" onClick={handleAddAllToCart}>
                Add All to Cart
            </Button>)}

            {isAllSelected && <Button variant="contained" color="secondary" onClick={handleRemoveAll}>
                Remove All
            </Button>}

            {selectedProducts.length > 0 && (
                <Typography variant="subtitle1" gutterBottom>
                    Selected: {selectedProducts.length} products, Total: ${selectedTotalPrice}
                </Typography>
            )}
        </Container>
    );
};



const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const ProductCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const ProductImage = styled(CardMedia)`
  height: 200px;
  
`;

const ProductTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductDescription = styled(Typography)`
  margin-bottom: 10px;
`;

const ProductPrice = styled(Typography)`
  margin-bottom: 10px;
`;

const DeleteButton = styled(IconButton)`
  align-self: flex-end;
  position: absolute;
`;

export default Wishlist;
