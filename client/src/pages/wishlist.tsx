import React, { useState } from 'react';
import styled from "styled-components";
import { Typography, Grid, Card, CardContent, CardMedia, Button, IconButton, Checkbox, Badge } from "@mui/material";
import { DeleteOutline, AddShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearWishlist, removeProductWishlist } from "../redux/wishlist.slice";





const Wishlist: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const wishlist = useAppSelector((state: any) => state.wishlist.products);
    const dispatch = useAppDispatch();




    const handleRemoveFromWishlist = (id: number) => {
        console.log(id);
        dispatch(removeProductWishlist(id));
    };


    const handleRemoveAll = () => {
        dispatch(clearWishlist());
        setSelectedProducts([]);
        setSelectedTotalPrice(0);
    };

    const handleToggleAll = () => {
        if (selectedProducts.length === wishlist.length) {
            setSelectedProducts([]);
            setSelectedTotalPrice(0);
            setIsAllSelected(false)
        } else {
            const allProductIds = wishlist.map((product: any) => product._id);
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
            const product = wishlist.find((product: any) => product._id === productId);
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
                {wishlist.map((products: any) => (
                    <Grid item key={products._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard>
                            <DeleteButton sx={{position: "absolute"}}  >
                                <DeleteOutline onClick={() => handleRemoveFromWishlist(products._id)} />
                            </DeleteButton>
                            <ProductImage image={products.img} />
                            <CardContent>
                                <ProductTitle variant="h6">{products.title}</ProductTitle>
                                <ProductDescription>{products.desc}</ProductDescription>
                                <ProductPrice variant="subtitle1">${products.price}</ProductPrice>

                                <Button variant="contained" color="primary" href={`/product/${products._id}`}>
                                    <AddShoppingCart /> Buy
                                </Button>

                                <Checkbox
                                    checked={selectedProducts.includes(products._id)}
                                    onChange={() => handleToggleProduct(products._id)}
                                />
                            </CardContent>
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" onClick={handleToggleAll}>
                {selectedProducts.length === wishlist.length ? "Deselect All" : "Select All"}
            </Button>


            {selectedProducts.length > 0 && (
                <Badge badgeContent={selectedProducts.length} color="warning">
                    <Button variant="contained" color="secondary" onClick={handleRemoveAll}>
                        Remove All
                    </Button>
                </Badge>
            )}

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
  position: relative;
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
`;

export default Wishlist;
