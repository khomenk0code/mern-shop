import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { Add, Announcement, DeleteOutline, Remove } from "@mui/icons-material";
import FooterComponent from "../components/footer.component";
import Navbar from "../components/header.component";
import { IProduct } from "../components/products.component";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { clearCart, removeProduct, updateQuantity } from "../redux/cart.slice";
import { Link } from "react-router-dom";
import cssColorNames from "css-color-names";
import { updateCart } from "../redux/api.calls";
import { userRequest } from "../utils/requestMethods";

type StyledTypesProps = {
    types?: "filled" | "total";
};

const Cart = () => {
    const [dataValue, setDataValue] = useState<string>("");
    const [signatureValue, setSignatureValue] = useState<string>("");
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);


    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const wishlist = useAppSelector((state) => state.wishlist.products);
    const user = useAppSelector((state) => state.user.currentUser);

    const userId = user ? user._id : null;


    const validColors = Object.keys(cssColorNames);
    const hasValidColors: boolean[] = [];

    cart.products.forEach((product, index) => {
        const validColorCount = product.color.filter((c) =>
            validColors.includes(c.toLowerCase())
        ).length;
        hasValidColors[index] = validColorCount !== 0;
    });


    useEffect(() => {
        const fetchForm = async () => {
            const total = cart.total || "0";
            try {
                const response = await userRequest.post(
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

    useEffect(() => {
        const updateCartOnServer = async () => {
            try {
                const formattedProducts = cart.products.map((product) => ({
                    productId: product._id,
                    color: product.color[0],
                    size: product.size[0],
                    quantity: product.quantity,
                }));

                await updateCart(formattedProducts);
            } catch (error) {
                console.error("Failed to update cart:", error);
            }
        };

        updateCartOnServer();
    }, [dispatch, userId, cart]);

    const handleRemoveFromCart = (
        productId: string,
        color: string,
        size: string
    ) => {
        dispatch(removeProduct({ productId, color, size }));
    };

    const handleIncQuantity = (
        productId: string,
        color: string,
        size: string,
        quantity: number
    ) => {
        dispatch(updateQuantity({ productId, color, size, quantity }));
    };

    const handleDecQuantity = (
        productId: string,
        color: string,
        size: string,
        quantity: number
    ) => {
        if (cart.quantity > cart.products.length) {
            dispatch(updateQuantity({ productId, color, size, quantity }));
        }
    };

    const handleClearCart = async () => {
        try {
            dispatch(clearCart());
        } catch (error) {
            throw new Error("Failed to clear cart");
        }
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
                    <TopButton to="/cabinet/wishlist" types="filled">
                        Your Wishlist ({wishlist.length || 0})
                    </TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.length > 0 ? (
                            cart.products.map((product: IProduct, index) => (
                                <div key={index}>
                                    <Product>
                                        <ProductDetail>
                                            {!imageLoaded && (
                                                <Image src={product?.altImg} />
                                            )}
                                            <Link
                                                to={`/product/${product._id}`}
                                            >
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
                                                        handleIncQuantity(
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
                                                        handleDecQuantity(
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
                        <ClearCart>
                            <TopButton to="#" types="filled" onClick={handleClearCart}>Clear cart</TopButton>
                        </ClearCart>
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

  ${mobile({ flexDirection: "column-reverse",
    padding: "5px"
  })}
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
    margin: 1rem 0;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const ClearCart = styled.div`
  height: 40px;
  display: flex;
  margin: 1rem;
  justify-content: flex-end;
`;

const Image = styled.img`
    width: 200px;
  ${mobile({ flexDirection: "column-reverse",
    width: "100px"
  })}
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  ${mobile({ 
    padding: "5px"
  })}
  
`;

const ProductName = styled.span`
  ${mobile({ flexDirection: "column-reverse",
    marginBottom: "5px"
  })}
`;

const ProductId = styled.span`
  ${mobile({ flexDirection: "column-reverse",
    marginBottom: "5px"
  })}
`;

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
  ${mobile({ flexDirection: "column-reverse",
    marginBottom: "5px"
  })}
`;

const ProductSize = styled.span`
    display: inline-block;
  ${mobile({ flexDirection: "column-reverse",
    marginBottom: "5px"
  })}
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  ${mobile({ flexDirection: "column-reverse",
    marginBottom: "5px"
  })}
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
