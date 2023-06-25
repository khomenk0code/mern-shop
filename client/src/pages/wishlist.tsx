import React, { useState } from "react";
import styled from "styled-components";
import { Badge, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { AddShoppingCart, DeleteOutline } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearWishlist, removeProductWishlist } from "../redux/wishlist.slice";
import { Hr } from "./cart.page";


const Wishlist: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const wishlist = useAppSelector((state: any) => state.wishlist.products);
    const dispatch = useAppDispatch();




    const handleRemoveFromWishlist = (id: number) => {
        console.log(id);
        dispatch(removeProductWishlist(id));
    };


    const handleRemoveAll = () => {
        dispatch(clearWishlist());
        setSelectedProducts([]);
    };
    //
    // const handleToggleAll = () => {
    //     if (selectedProducts.length === wishlist.length) {
    //         setSelectedProducts([]);
    //         setSelectedTotalPrice(0);
    //         setIsAllSelected(false)
    //     } else {
    //         const allProductIds = wishlist.map((product: any) => product._id);
    //         setSelectedProducts(allProductIds);
    //         calculateSelectedTotalPrice(allProductIds);
    //         setIsAllSelected(true)
    //
    //     }
    // };
    //
    // const handleToggleProduct = (id: number) => {
    //     setSelectedProducts((prevSelectedProducts) => {
    //         if (prevSelectedProducts.includes(id)) {
    //             const updatedSelectedProducts = prevSelectedProducts.filter((productId) => productId !== id);
    //             calculateSelectedTotalPrice(updatedSelectedProducts);
    //             return updatedSelectedProducts;
    //         } else {
    //             const updatedSelectedProducts = [...prevSelectedProducts, id];
    //             calculateSelectedTotalPrice(updatedSelectedProducts);
    //             return updatedSelectedProducts;
    //         }
    //     });
    // };

    const calculateTotalPrice = () => {
        return wishlist.reduce((total: any, product: any) => {
            return total + product.price;
        }, 0);
    };


    console.log(wishlist);

    return (
        <Container>
         <Title>
             <Typography variant="h4" gutterBottom>
                 Wishlist
             </Typography>
             {wishlist.length > 0 &&  (
                 <Badge badgeContent={wishlist.length} color="warning">
                     <Button variant="contained" color="secondary" onClick={handleRemoveAll}>
                         Remove All
                     </Button>
                 </Badge>
             )}
         </Title>
            <Grid container spacing={2}>
                {wishlist.map((products: any) => (
                    <Grid item key={products._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard>
                            <ProductImage image={products.img} />
                            <DeleteButton
                                onClick={() => handleRemoveFromWishlist(products._id)}>
                                <DeleteOutline />
                            </DeleteButton>
                            <ProductCardContent>
                                <ProductTitle variant="h5">{products.title}</ProductTitle>
                                <ProductDescription>{products.desc}</ProductDescription>
                                <ProductPrice variant="h5">${products.price}</ProductPrice>

                              <CardBottom>
                                  <Button variant="contained" color="primary" href={`/product/${products._id}`}>
                                      <AddShoppingCart /> Buy
                                  </Button>
                                  {/*<Checkbox*/}
                                  {/*    checked=*/}
                                  {/*    onChange={() => handleToggleProduct(products._id)}*/}
                                  {/*/>*/}
                              </CardBottom>
                            </ProductCardContent>
            {selectedProducts.includes(products._id)}
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>
                <HrLine/>
            {/*<Button variant="contained" onClick={handleToggleAll}>*/}
            {/*    {selectedProducts.length === wishlist.length ? "Deselect All" : "Select All"}*/}
            {/*</Button>*/}

            {/*{selectedProducts.length > 0 && (*/}
            {/*    <Typography variant="subtitle1" gutterBottom>*/}
            {/*        Selected: {selectedProducts.length} products, Total: ${selectedTotalPrice}*/}
            {/*    </Typography>*/}
            {/*)}*/}
            <TotalPrice>
                <Typography variant="subtitle1">
                    <strong>{wishlist.length}</strong> products in total, with a total sum of
                </Typography>
                <Typography variant="h5" >
                    ${calculateTotalPrice()}
                </Typography>
            </TotalPrice>
        </Container>
    );
};


const HrLine = styled(Hr)`
    margin-top: 1rem;
`;

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;
const TotalPrice = styled.div`
  display: flex;  
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: flex-end;
`;
const Title = styled.div`
  display: flex;  
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-align: center;
`;

const ProductCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

`;

const ProductImage = styled(CardMedia)`
  height: 200px;
  position: relative;
`;

const ProductTitle = styled(Typography)`
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  min-height: 30px;
`;

const ProductDescription = styled(Typography)`
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 3;
  
`;

const ProductPrice = styled(Typography)`

  flex: 1;
  display: flex;
  align-items: center;
`;

const DeleteButton = styled.button`
  align-self: flex-end;
  background-color: #eef3f3;
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  margin: 5px;

  &:hover {
    background-color: #d1dada;
  }
`;
const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export default Wishlist;
