import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { Add, Announcement, DeleteOutline, Remove } from "@mui/icons-material";
import FooterComponent from "../components/footer.component";
import Navbar from "../components/header.component";
import axios, { AxiosError } from "axios";
import { IProduct } from "../components/products.component";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { clearCart, removeProduct, updateQuantity } from "../redux/cart.slice";
import { Link } from "react-router-dom";
import cssColorNames from "css-color-names";

type StyledTypesProps = {
    types?: "filled" | "total";
};

const Cart = () => {
    const [dataValue, setDataValue] = useState("");
    const [signatureValue, setSignatureValue] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");

    const cart = useAppSelector((state) => state.cart);
    const wishlist = useAppSelector((state) => state.wishlist.products);
    const dispatch = useAppDispatch();

    const validColors = Object.keys(cssColorNames);
    const hasValidColors: any = [];
    cart.products.forEach((product, index) => {
        const validColorCount = product.color.filter((c) =>
            validColors.includes(c.toLowerCase())
        ).length;

        hasValidColors[index] = validColorCount !== 0;
    });

    const axiosClient = axios.create({
        baseURL: "https://mern-shop-api.vercel.app/api",
    });


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


    const handleRemoveFromCart = (
        productId: string,
        color: string,
        size: string
    ) => {
        dispatch(removeProduct({ productId, color, size }));
    };

    const updateProductQuantity = (
        productId: string,
        color: string,
        size: string,
        quantity: number
    ) => {
        dispatch(updateQuantity({ productId, color, size, quantity }));
    };

    const handleRemove = (
        productId: string,
        color: string,
        size: string,
        quantity: number
    ) => {
        if (cart.quantity > cart.products.length) {
            dispatch(updateQuantity({ productId, color, size, quantity }));
        }
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Cart</Title>
                <Top>
                    <TopButton to="/">CONTINUE SHOPPING</TopButton>
                    <button onClick={handleClearCart}>Очистить корзину</button>
                    <TopButton to="/cabinet/wishlist" types="filled">
                        Your Wishlist ({wishlist.length || 0})
                        <div>
                            <h1>Status: {paymentStatus}</h1>
                        </div>
                    </TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.length > 0 ? (
                            cart.products.map((product: IProduct, index) => (
                                <div key={index}>
                                    <Product >
                                        <ProductDetail>
                                            {!imageLoaded && (
                                                <Image src={product?.altImg} />
                                            )}
                                            <Link to={`/product/${product._id}`}>
                                            <Image
                                                src={product?.img}
                                                onLoad={handleImageLoad}
                                                style={{
                                                    display: imageLoaded
                                                        ? "block"
                                                        : "none",
                                                }}
                                            />
                                            </Link>

                                            <Details>
                                                <ProductName>
                                                    <b>Product:</b>{" "}
                                                    {product.title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID:</b> {product._id}
                                                </ProductId>
                                                {hasValidColors[index] ? (
                                                    <div>
                                                        <b>Color: </b>

                                                        <ProductColor
                                                            color={
                                                                product.color &&
                                                                product.color[0]
                                                            }
                                                        />
                                                    </div>
                                                ) : null}

                                                {product.size[0] !== "" ? (
                                                    <div>
                                                        <b>Size: </b>
                                                        <ProductSize>
                                                            {product.size}
                                                        </ProductSize>
                                                    </div>
                                                ) : null}
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ButtonWrapper>
                                                <DeleteButton
                                                    onClick={() =>
                                                        handleRemoveFromCart(
                                                            product._id,
                                                            product.color[0],
                                                            product.size[0]
                                                        )
                                                    }
                                                >
                                                    <DeleteOutline />
                                                </DeleteButton>
                                            </ButtonWrapper>

                                            <ProductAmountContainer>
                                                <Add
                                                    onClick={() =>
                                                        updateProductQuantity(
                                                            product._id,
                                                            product.color[0],
                                                            product.size[0],
                                                            product.quantity + 1
                                                        )
                                                    }
                                                />
                                                <ProductAmount>
                                                    {product.quantity}
                                                </ProductAmount>
                                                <Remove
                                                    onClick={() =>
                                                        handleRemove(
                                                            product._id,
                                                            product.color[0],
                                                            product.size[0],
                                                            product.quantity - 1
                                                        )
                                                    }
                                                />
                                            </ProductAmountContainer>
                                            <ProductPrice>
                                                ${" "}
                                                {product.price *
                                                    product.quantity}
                                            </ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
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
            <FooterComponent />
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

const TopButton = styled(Link)<StyledTypesProps>`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.types === "filled" && "none"};
    background-color: ${(props) =>
        props.types === "filled" ? "black" : "transparent"};
    color: ${(props) => props.types === "filled" && "white"};
    text-decoration: none;
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

const ProductColor = styled.span<StyledTypesProps>`
    border-radius: 50%;
    background-color: ${(props) => props.color};
    width: ${(props) =>
        props.color?.toLowerCase() === "white" ? "19px" : "20px"};
    height: ${(props) =>
        props.color?.toLowerCase() === "white" ? "19px" : "20px"};
    border: ${(props) =>
        props.color?.toLowerCase() === "white" ? "1px solid black" : "none"};
    display: inline-block;
`;

const ProductSize = styled.span`
    display: inline-block;
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
`;

const DeleteButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: transparent;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
`;

const ProductAmount = styled.span`
    margin: 5px;
    font-weight: 500;
`;

const ProductPrice = styled.span`
    font-weight: 500;
`;

export const Hr = styled.hr`
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
`;

export default Cart;
