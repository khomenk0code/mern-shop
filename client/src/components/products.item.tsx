import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { StyledLink } from "./header.component";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
    addProductWishlist,
    removeProductWishlist,
} from "../redux/wishlist.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addToWishlist } from "../redux/api.calls";




export interface IPopularProducts {
    altImg: any;
    _id: number;
    img: string;
}

type CategoriesItemProps = {
    item: IPopularProducts;
};

const ProductsItem: React.FC<CategoriesItemProps> = ({ item }) => {
    const [liked, setLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const wishlistProducts = useAppSelector((state) => state.wishlist.products);
    const user: any  = useAppSelector(state => state.user.currentUser)

    const userId = user._id;





    const dispatch = useAppDispatch();



    useEffect(() => {
        const isProductInWishlist = wishlistProducts.some(
            (product) => product._id === item._id.toString()
        );
        setLiked(isProductInWishlist);
    }, [wishlistProducts, item._id]);


    const handleLike = async () => {
        if (liked) {
            dispatch(removeProductWishlist(item._id));
        } else {
            try {
                const wishlistItem = { ...item, userId };

                await addToWishlist(item._id, userId);
                dispatch(addProductWishlist(wishlistItem));
            } catch (error) {
                console.log("Failed to add product to wishlist:", error);
            }
        }
        setLiked(!liked);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Container>
            <Circle />
            {!imageLoaded && <img src={item.altImg} alt="image" />}
            <Image
                src={item.img}
                onLoad={handleImageLoad}
                style={{ display: imageLoaded ? "block" : "none" }}
            />
            <Info>
                <Icon>
                    <StyledLink to={`/product/${item._id}`}>
                        <SearchOutlined />
                    </StyledLink>
                </Icon>
                <Icon>
                    <ShoppingCartOutlined />
                </Icon>
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
            </Info>
        </Container>
    );
};

const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    z-index: 3;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #eceff3;
    z-index: 2;

    &:hover ${Info} {
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #000;
    position: absolute;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const LikeIcon = styled(Icon)``;

const Image = styled.img`
    height: 75%;
    z-index: 2;
    max-width: 270px;
`;

export default ProductsItem;
