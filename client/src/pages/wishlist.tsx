import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Grid,
    Typography,
} from "@mui/material";
import { AddShoppingCart, Close, DeleteOutline } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearWishlist, removeProductWishlist } from "../redux/wishlist.slice";
import { Hr } from "./cart.page";
import {
    Filter,
    FilterColor,
    FilterColorProps,
    FilterContainer,
    FilterSize,
    FilterTitle,
} from "./product.page";
import cssColorNames from "css-color-names";
import { Link } from "react-router-dom";
import { addProducts } from "../redux/cart.slice";
import { removeFromWishlist, removeFromWishlistAll } from "../redux/api.calls";

interface SelectedColors {
    [productId: string]: string;
}

const Wishlist: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [selectedColors, setSelectedColors] = useState<SelectedColors>({});
    const [size, setSize] = useState<any>({});
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [selectedProductsInPopup, setSelectedProductsInPopup] = useState<
        number[]
    >([]);
    const user: any = useAppSelector((state) => state.user.currentUser);
    const wishlist = useAppSelector((state: any) => state.wishlist.products);
    const dispatch = useAppDispatch();
    const validColors = Object.keys(cssColorNames);
    const userId = user ? user._id : null;

    useEffect(() => {
        selectedProductsInPopup.forEach((productId: number) => {
            const product = wishlist.find(
                (product: any) => product._id === productId
            );
            if (product) {
                const validProductColors = Array.isArray(product.color)
                    ? product.color.filter((c: any) =>
                          validColors.includes(c.toLowerCase())
                      )
                    : [];
                const defaultColor =
                    validProductColors.length > 0 ? validProductColors[0] : "";
                const defaultSize =
                    product.size.length > 0 ? product.size[0] : "";

                setSelectedColors((prevSelectedColors) => ({
                    ...prevSelectedColors,
                    [productId]: prevSelectedColors[productId] || defaultColor,
                }));

                setSize((prevSize: any) => ({
                    ...prevSize,
                    [productId]: prevSize[productId] || defaultSize,
                }));
            }
        });
    }, [selectedProductsInPopup, wishlist]);

    const handleRemoveFromWishlist = async (id: number, userId: any) => {
        await removeFromWishlist(id, userId);
        dispatch(removeProductWishlist([id]));
    };

    const handleRemoveAll = async (userId: any) => {
        try {
            if (selectedProducts.length === wishlist.length) {
                dispatch(clearWishlist());
                await removeFromWishlistAll(userId);
                setSelectedProducts([]);
            } else {
                for (const productId of selectedProducts) {
                    try {
                        await removeFromWishlist(productId, userId);
                        dispatch(removeProductWishlist([productId]));
                    } catch (error) {
                        console.log(
                            "Failed to remove product from wishlist:",
                            error
                        );
                    }
                }
                setSelectedProducts([]);
            }
        } catch (error) {
            console.log(
                "Failed to handle removing all products from wishlist:",
                error
            );
        }
    };

    const calculateSelectedTotalPrice = (selectedProductIds: number[]) => {
        const totalPrice = selectedProductIds.reduce((total, productId) => {
            const product = wishlist.find(
                (product: any) => product._id === productId
            );
            return total + (product ? product.price : 0);
        }, 0);
        setSelectedTotalPrice(totalPrice);
    };

    const handleToggleAll = () => {
        if (selectedProducts.length === wishlist.length) {
            setSelectedProducts([]);
            setSelectedProductsInPopup([]);
            setSelectedTotalPrice(0);
            setIsAllSelected(false);
        } else {
            const allProductIds = wishlist.map((product: any) => product._id);
            setSelectedProducts(allProductIds);
            setSelectedProductsInPopup(allProductIds);
            calculateSelectedTotalPrice(allProductIds);
            setIsAllSelected(true);
        }
    };

    const handleToggleProduct = (id: number) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.includes(id)) {
                const updatedSelectedProducts = prevSelectedProducts.filter(
                    (productId) => productId !== id
                );
                calculateSelectedTotalPrice(updatedSelectedProducts);
                return updatedSelectedProducts;
            } else {
                const updatedSelectedProducts = [...prevSelectedProducts, id];
                calculateSelectedTotalPrice(updatedSelectedProducts);
                return updatedSelectedProducts;
            }
        });

        setSelectedProductsInPopup((prevSelectedProducts) => {
            if (prevSelectedProducts.includes(id)) {
                return prevSelectedProducts.filter(
                    (productId) => productId !== id
                );
            } else {
                return [...prevSelectedProducts, id];
            }
        });
    };

    const calculateTotalPrice = () => {
        return wishlist.reduce((total: any, product: any) => {
            return total + product.price;
        }, 0);
    };

    const handleBuyOne = (id: number) => {
        const newSelectedProductsInPopup = [id];

        setShowCartPopup(true);
        setSelectedProductsInPopup(newSelectedProductsInPopup);
    };

    const handleBuyAll = () => {
        let updatedSelectedProductsInPopup: any[];

        if (selectedProducts.length === 0) {
            updatedSelectedProductsInPopup = wishlist.map(
                (product: any) => product._id
            );
        } else {
            updatedSelectedProductsInPopup = [...selectedProducts];
        }

        setSelectedProductsInPopup(updatedSelectedProductsInPopup);
        setShowCartPopup(true);
    };

    const handleClick = () => {
        const selectedProductsToAdd = wishlist
            .filter((product: any) =>
                selectedProductsInPopup.includes(product._id)
            )
            .map((product: any) => {
                const newColor = [
                    selectedColors[product._id] || product.color[0],
                ];
                const newSize = [size[product._id] || product.size[0]];

                return {
                    ...product,
                    color: newColor,
                    size: newSize,
                    quantity: 1,
                };
            });

        dispatch(addProducts(selectedProductsToAdd));

        setShowCartPopup(false);
    };

    const handleColorSelection = (productId: string, color: string) => {
        setSelectedColors((prevSelectedColors) => ({
            ...prevSelectedColors,
            [productId]: color,
        }));
    };

    return (
        <Container>
            <Title>
                <Typography variant="h4" gutterBottom>
                    Wishlist
                </Typography>
                {selectedProducts.length >= 2 && (
                    <Badge
                        badgeContent={selectedProducts.length}
                        color="warning"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleRemoveAll(userId)}
                        >
                            Remove Selected
                        </Button>
                    </Badge>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBuyAll}
                >
                    {selectedProducts.length >= 1 &&
                    selectedProducts.length !== wishlist.length
                        ? "Buy Selected"
                        : "Buy All"}
                </Button>
            </Title>
            <Grid container spacing={2}>
                {wishlist.map((product: any) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard>
                            <Link to={`/product/${product._id}`}>
                                <ProductImage image={product.img} />
                            </Link>
                            <DeleteButton
                                onClick={() =>
                                    handleRemoveFromWishlist(
                                        product._id,
                                        userId
                                    )
                                }
                            >
                                <DeleteOutline />
                            </DeleteButton>
                            <ProductCardContent>
                                <ProductTitle variant="h5">
                                    {product.title}
                                </ProductTitle>
                                <ProductDescription>
                                    {product.desc}
                                </ProductDescription>
                                <ProductPrice variant="h5">
                                    ${product.price}
                                </ProductPrice>

                                <CardBottom>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            handleBuyOne(product._id)
                                        }
                                    >
                                        <AddShoppingCart /> Buy
                                    </Button>
                                    <Checkbox
                                        checked={selectedProducts.includes(
                                            product._id
                                        )}
                                        onChange={() =>
                                            handleToggleProduct(product._id)
                                        }
                                    />
                                </CardBottom>
                            </ProductCardContent>
                        </ProductCard>
                    </Grid>
                ))}
            </Grid>

            <HrLine />

            {showCartPopup && (
                <ConfirmationPopup>
                    <ConfirmationText>Add to cart</ConfirmationText>
                    <ClosePopupButton onClick={() => setShowCartPopup(false)}>
                        <Close />
                    </ClosePopupButton>

                    {selectedProductsInPopup.length > 0 && (
                        <div>
                            {wishlist
                                .filter((product: any) =>
                                    selectedProductsInPopup.includes(
                                        product._id
                                    )
                                )
                                .map((product: any) => (
                                    <div key={product._id}>
                                        <WrapperToCart>
                                            <ImageToCart
                                                src={product.img}
                                                alt=""
                                            />
                                            <div>
                                                <AddToCartTitle>
                                                    {product.title}
                                                </AddToCartTitle>
                                                <FilterContainerWishlist>
                                                    {product?.color?.filter((c: any) => validColors.includes(c.toLowerCase())).length !== 0 ? (
                                                        <Filter>
                                                            <FilterTitleWishlist>
                                                                {product?.color?.length <= 1 ? "Color: " : "Colors: "}
                                                            </FilterTitleWishlist>
                                                            {product?.color?.filter((c: any) => validColors.includes(c.toLowerCase())).map((c: any) => (
                                                                <FilterColorWishlist
                                                                    color={c}
                                                                    key={c}
                                                                    onClick={() => handleColorSelection(product._id, c)}
                                                                    isSelected={selectedColors[product._id] === c}
                                                                />
                                                            ))}
                                                        </Filter>
                                                    ) : null}

                                                    {product?.size?.length !== 0 ? (
                                                        <FilterWishlist>
                                                            <FilterTitleWishlist>Size: </FilterTitleWishlist>
                                                            <FilterSizeWishlist
                                                                onChange={(e) =>
                                                                    setSize((prevSize: any) => ({
                                                                        ...prevSize,
                                                                        [product._id]: e.target.value,
                                                                    }))
                                                                }
                                                                value={size[product?._id] || product?.size[0]}
                                                            >
                                                                {product?.size
                                                                    .slice()
                                                                    .sort((a: any, b: any) => {
                                                                        const sizesOrder = ["XS", "S", "M", "L", "XL", "XXL"];
                                                                        return sizesOrder.indexOf(a) - sizesOrder.indexOf(b);
                                                                    })
                                                                    .map((s: any) => (
                                                                        <option key={s}>{s}</option>
                                                                    ))}
                                                            </FilterSizeWishlist>
                                                        </FilterWishlist>
                                                    ) : null}
                                                </FilterContainerWishlist>;

                                            </div>
                                            <PriceToCart>
                                                {" "}
                                                {product.price}$
                                            </PriceToCart>
                                        </WrapperToCart>
                                        <HrLineCart />
                                    </div>
                                ))}
                        </div>
                    )}
                    <ConfirmationButtons>
                        <ConfirmationButton>
                            Continue shopping
                        </ConfirmationButton>
                        <ConfirmationButton onClick={handleClick}>
                            Add to cart
                        </ConfirmationButton>
                    </ConfirmationButtons>
                </ConfirmationPopup>
            )}
            {wishlist.length > 0 ? (
                <>
                    <TotalPrice>
                        <Typography variant="subtitle1">
                            <strong>{wishlist.length}</strong> products in
                            total, with a total sum of
                        </Typography>
                        <Typography variant="h5">
                            ${calculateTotalPrice()}
                        </Typography>
                    </TotalPrice>

                    <Button variant="contained" onClick={handleToggleAll}>
                        {selectedProducts.length === wishlist.length
                            ? "Deselect All"
                            : "Select All"}
                    </Button>

                    {selectedProducts.length > 0 && (
                        <Typography variant="subtitle1" gutterBottom>
                            Selected: {selectedProducts.length} products, Total:
                            ${selectedTotalPrice}
                        </Typography>
                    )}
                </>
            ) : (
                <EmptyCartMessage>
                    <h2>Wishlist is empty</h2>
                    <CartLink to="/">Continue shopping</CartLink>
                </EmptyCartMessage>
            )}
        </Container>
    );
};

const ClosePopupButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`;

const EmptyCartMessage = styled.div`
    margin-top: 2rem;
    font-size: 24px;
    text-align: center;
`;

const CartLink = styled(Link)`
    display: inline-block;
    padding: 0.5rem 1rem;
    margin-top: 2rem;
    background-color: #75e01b;
    color: white;
    text-decoration: none;
    border-radius: 4px;
`;

export const ImageToCart = styled.img`
    height: 100px;
`;

export const WrapperToCart = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
`;

export const PriceToCart = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
`;
export const AddToCartTitle = styled.h4`
    font-size: 20px;
`;

const FilterContainerWishlist = styled(FilterContainer)``;
const FilterWishlist = styled(Filter)``;
const FilterTitleWishlist = styled(FilterTitle)``;
const FilterColorWishlist = styled(FilterColor)<FilterColorProps>``;
const FilterSizeWishlist = styled(FilterSize)``;

export const ConfirmationPopup = styled.div`
    position: fixed;
    width: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
`;

export const ConfirmationText = styled.div`
    margin-bottom: 20px;
    text-align: center;
    font-size: 22px;
`;

export const ConfirmationButtons = styled.div`
    display: flex;
    justify-content: center;
`;

export const ConfirmationButton = styled.button`
    margin: 20px 15px;
    padding: 15px 40px;
    background-color: #3bb077;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2d8a5f;
    }
`;

const HrLineCart = styled(Hr)`
    margin-top: 1rem;
    background-color: #282727;
`;

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
    height: 350px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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
