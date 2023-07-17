import React, { useEffect, useState } from "react";
import Navbar from "../components/header.component";
import Announcement from "../components/anonouncement.component";
import FooterComponent from "../components/footer.component";
import Newsletter from "../components/newsletter.component";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { useLocation } from "react-router-dom";
import { IProduct } from "../components/products.component";
import { publicRequest } from "../utils/requestMethods";
import { addProducts, updateQuantity } from "../redux/cart.slice";
import { useDispatch } from "react-redux";
import cssColorNames from "css-color-names";
import { useAppSelector } from "../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
    addProductWishlist,
    removeProductWishlist,
} from "../redux/wishlist.slice";
import { addToWishlist, removeFromWishlist } from "../redux/api.calls";
import { Icon } from "@mui/material";

export interface FilterColorProps {
    color: string;
    isSelected: boolean;
    onClick: () => void;
}

const Product: React.FC = () => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [color, setColor] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [isColorSelected, setIsColorSelected] = useState<boolean>(false);
    const products = useAppSelector((state) => state.cart.products);
    const [showNotification, setShowNotification] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [liked, setLiked] = useState(false);
    const wishlistProducts = useAppSelector((state) => state.wishlist.products);
    const user: any = useAppSelector((state) => state.user.currentUser);
    const userId = user ? user._id : null;

    const dispatch = useDispatch();
    const location = useLocation();
    const id: string = location.pathname.split("/")[2];
    const validColors = Object.keys(cssColorNames);

    useEffect(() => {
        const isProductInWishlist = wishlistProducts.some(
            (product) => product._id === product._id.toString()
        );
        setLiked(isProductInWishlist);
    }, [wishlistProducts, product?._id]);

    const handleQuantity = (type: "inc" | "dec") => {
        setQuantity((prevState) => {
            if (type === "dec") {
                if (prevState > 1) {
                    return prevState - 1;
                } else {
                    return prevState;
                }
            } else {
                return prevState + 1;
            }
        });
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleLike = async () => {
        if (!userId) {
            console.log("User is not logged in. Cannot add to wishlist.");
            return;
        }

        if (liked) {
            dispatch(removeProductWishlist(product?._id));
            await removeFromWishlist(product?._id, userId);
        } else {
            try {
                const wishlistItem = { ...product, userId };
                dispatch(addProductWishlist(wishlistItem));
                await addToWishlist(product?._id, userId);
            } catch (error) {
                console.log("Failed to add product to wishlist:", error);
            }
        }
        setLiked(!liked);
    };

    const handleClick = () => {
        const hasValidColors =
            product?.color.filter((c) => validColors.includes(c.toLowerCase()))
                .length !== 0;

        if (hasValidColors && (!color || color === "")) {
            setIsColorSelected(true);
            return;
        }

        setShowNotification(false);

        if (product) {
            const existingProduct = products.find(
                (p) =>
                    p._id === product._id &&
                    p.color.includes(color) &&
                    p.size.toString() === size
            );

            if (existingProduct) {
                dispatch(
                    updateQuantity({
                        productId: existingProduct._id,
                        color,
                        size,
                        quantity: existingProduct.quantity + 1,
                    })
                );
                return;
            }

            dispatch(
                addProducts([
                    {
                        ...product,
                        quantity,
                        color: [color],
                        size: [size],
                    } as IProduct,
                ])
            );
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getProducts();
    }, [id]);

    useEffect(() => {
        if (product?.size && product.size.length > 0) {
            setSize(product.size[0]);
        }
        if (product?.color && product.color.length > 0) {
            setColor(product.color[0]);
        }
    }, [product]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    {!imageLoaded && <Image src={product?.altImg} />}
                    <Image
                        src={product?.img}
                        onLoad={handleImageLoad}
                        style={{ display: imageLoaded ? "block" : "none" }}
                    />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product?.title}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>{product?.price} $</Price>
                    <FilterContainer>
                        {product?.color.filter((c) =>
                            validColors.includes(c.toLowerCase())
                        ).length !== 0 ? (
                            <Filter>
                                <FilterTitle>
                                    {product &&
                                    product.color &&
                                    product.color.length <= 1
                                        ? "Color: "
                                        : "Colors: "}
                                </FilterTitle>
                                {product?.color
                                    .filter((c) =>
                                        validColors.includes(c.toLowerCase())
                                    )
                                    .map((c) => (
                                        <FilterColor
                                            color={c}
                                            key={c}
                                            onClick={() => {
                                                setColor(c);
                                                setIsColorSelected(false);
                                            }}
                                            isSelected={c === color}
                                        />
                                    ))}
                            </Filter>
                        ) : null}

                        {product?.size?.length !== 0 ? (
                            <Filter>
                                <FilterTitle>Size: </FilterTitle>
                                <FilterSize
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    {product?.size
                                        .sort((a, b) => {
                                            const sizesOrder = [
                                                "XS",
                                                "S",
                                                "M",
                                                "L",
                                                "XL",
                                                "XXL",
                                            ];
                                            return (
                                                sizesOrder.indexOf(a) -
                                                sizesOrder.indexOf(b)
                                            );
                                        })
                                        .map((s) => (
                                            <FilterSizeOption key={s}>
                                                {s}
                                            </FilterSizeOption>
                                        ))}
                                </FilterSize>
                            </Filter>
                        ) : null}
                    </FilterContainer>

                    <AddContainer>
                        <AmountContainer>
                            <QuantityWrapper>
                                <Remove onClick={() => handleQuantity("dec")} />
                            </QuantityWrapper>
                            <Amount>{quantity}</Amount>
                            <QuantityWrapper>
                                <Add onClick={() => handleQuantity("inc")} />
                            </QuantityWrapper>
                        </AmountContainer>
                        <ButtonContainer>
                            {isColorSelected && (
                                <WarningText>Please select a color</WarningText>
                            )}
                            {showNotification && (
                                <WarningText>
                                    Product already in the cart
                                </WarningText>
                            )}
                            <Button onClick={handleClick}>ADD TO CART</Button>
                        </ButtonContainer>
                        <LikeIcon onClick={handleLike}>
                            {liked ? (
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    beat
                                    size={"lg"}
                                    style={{
                                        color: "#fe2a2a",
                                        animationDuration: "1s",
                                        animationIterationCount: "1",
                                    }}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    size={"lg"}
                                    style={{ color: "#000000" }}
                                />
                            )}
                        </LikeIcon>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <FooterComponent />
        </Container>
    );
};

const WarningText = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

export const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

export const Filter = styled.div`
    display: flex;
    align-items: center;
`;

export const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

export const FilterColor = styled.div<FilterColorProps>`
    width: ${(props) => (props.color === "White" ? "19px" : "20px")};
    height: ${(props) => (props.color === "White" ? "19px" : "20px")};
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0 5px;
    cursor: pointer;
    border: ${(props) =>
        props.color?.toLowerCase() === "white" ? "1px solid black" : "none"};
    transform: ${(props) => (props.isSelected ? "scale(1.4)" : "scale(1)")};
    transition: transform 0.2s ease-in-out;
`;

export const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

export const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const QuantityWrapper = styled.div`
    cursor: pointer;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    margin-left: 1rem;

    ${mobile({ width: "100%" })}
`;

const Button = styled.button`
    margin: 5px;
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #f8f4f4;
    }
`;

const LikeIcon = styled.div`
    margin-left: 30px;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export default Product;
