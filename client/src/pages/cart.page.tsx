import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { Add, Announcement, Remove } from "@mui/icons-material";
import Footer from "../components/footer";
import Navbar from "../components/header.component";
import axios from "axios";
import { IProduct } from "../components/products.component";
import { useAppSelector } from "../hooks/hooks";

type StyledTypesProps = {
    types?: "filled" | "total";
};

const Cart = () => {
    const [dataValue, setDataValue] = useState("");
    const [signatureValue, setSignatureValue] = useState("");

    const cart = useAppSelector((state) => state.cart);

    const axiosClient = axios.create({ baseURL: "http://localhost:5000/api" });


    useEffect(() => {
        const fetchForm = async () => {
            const total = cart.total || "0";
            try {
                const response = await axiosClient.post(
                    "/payment",
                    {
                        amount: total,
                        description: "Оплата заказа",
                        currency: "USD",
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const responseHtml = response.data;
                const tempContainer = document.createElement("div");
                tempContainer.innerHTML = responseHtml;
                const dataInput = tempContainer.querySelector(
                    'input[name="data"]'
                ) as HTMLInputElement;
                const signatureInput = tempContainer.querySelector(
                    'input[name="signature"]'
                ) as HTMLInputElement;
                const dataValue = dataInput ? dataInput.value : "";
                const signatureValue = signatureInput
                    ? signatureInput.value
                    : "";

                setDataValue(dataValue);
                setSignatureValue(signatureValue);
            } catch (error) {
                console.error(error);
            }
        };

        fetchForm();
    }, [cart.total]);

    // useEffect(() => {
    //     const handleLiqPayCallback = async () => {
    //         try {
    //             const response = await axiosClient.post("/payment/liqpay-callback", {
    //                 data: dataValue,
    //                 signature: signatureValue,
    //             });
    //
    //             if (response.status === 200) {
    //                 console.log("ez", response.data);
    //             } else {
    //               console.error("errrrrr")
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //
    //     if (dataValue && signatureValue) {
    //         handleLiqPayCallback();
    //     }
    // }, [dataValue, signatureValue]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton types="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>

                        {cart.products.map((product: IProduct) => (
                            <>
                            <Product key={product.id}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product._id}
                                        </ProductId>
                                        <b>Color:</b>
                                        {product.color &&
                                            typeof product.color ===
                                                "string" && (
                                                <ProductColor
                                                    color={product.color}
                                                />
                                            )}

                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add />
                                        <ProductAmount>
                                            {product.quantity}
                                        </ProductAmount>
                                        <Remove />
                                    </ProductAmountContainer>
                                    <ProductPrice>
                                        $ {product.price * product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                               <Hr/></>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Estimated Shipping
                            </SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem types="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <form
                            method="POST"
                            action="https://www.liqpay.ua/api/3/checkout"
                            acceptCharset="utf-8"
                            target="_blank"
                        >
                            <input
                                type="hidden"
                                name="data"
                                value={dataValue}
                            />
                            <input
                                type="hidden"
                                name="signature"
                                value={signatureValue}
                            />
                            <Button type="submit">CHECKOUT NOW</Button>
                        </form>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button<StyledTypesProps>`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.types === "filled" && "none"};
    background-color: ${(props) =>
        props.types === "filled" ? "black" : "transparent"};
    color: ${(props) => props.types === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div<StyledTypesProps>`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.types === "total" && "500"};
    font-size: ${(props) => props.types === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

export default Cart;
