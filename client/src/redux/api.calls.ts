import { loginFailure, loginStart, loginSuccess } from "./user.slice";
import { publicRequest, userRequest } from "../utils/requestMethods";

const login = async (dispatch: any, user: any) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        return res.data;
    } catch (e) {
        dispatch(loginFailure());
        throw new Error("Login failed");
    }
};

export const addToWishlist = async (productId: any, userId: any) => {
    try {
        const existingWishlist = await userRequest.get(
            `/wishlist/find/${userId}`
        );

        if (
            existingWishlist &&
            existingWishlist.data !== null &&
            existingWishlist.status === 200
        ) {
            const wishlistId = existingWishlist.data._id;

            // Check if the productId is already in the wishlist
            if (!existingWishlist.data.productId.includes(productId)) {
                // If the productId is not in the wishlist, add it to the list of productIds
                const updatedWishlist = {
                    userId,
                    productId, // Pass the productId as a single string, not an array
                };

                const res = await userRequest.put(
                    `/wishlist/${wishlistId}`,
                    updatedWishlist
                );
                return res.data;
            } else {
                // If the productId is already in the wishlist, return the existing wishlist without changes
                return existingWishlist.data;
            }
        } else {
            // If the wishlist doesn't exist, create a new one with the productId
            const newWishlist = {
                userId,
                productId: [productId], // Ensure that productId is passed as an array with a single string element
            };
            const res = await userRequest.post("/wishlist", newWishlist);
            return res.data;
        }
    } catch (error) {
        throw new Error("Failed to add product to wishlist");
    }
};

export const removeFromWishlist = async (productId: any, userId: any) => {
    try {
        const existingWishlist = await userRequest.get(
            `/wishlist/find/${userId}`
        );

        if (existingWishlist && existingWishlist.status === 200) {
            const wishlistId = existingWishlist.data._id;
            const updatedWishlist = {
                userId,
                productId: existingWishlist.data.productId.filter(
                    (id: string) => id !== productId
                ),
            };

            const res = await userRequest.put(
                `/wishlist/${wishlistId}/${productId}`,
                updatedWishlist
            );
            return res.data;
        } else {
            throw new Error("Wishlist not found");
        }
    } catch (error) {
        throw new Error("Failed to remove product from wishlist");
    }
};

export const removeFromWishlistAll = async (userId: any) => {
    try {
        const res = await userRequest.delete(`/wishlist/user/${userId}`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to remove all products from wishlist");
    }
};

export const getWishlist = async (userId: any) => {
    try {
        const res = await userRequest.get(`/wishlist/find/${userId}`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch wishlist");
    }
};

export const addToCart = async (userId: any, product: any) => {
    try {
        const existingCart = await userRequest.get(`/cart/find/${userId}`);

        if (existingCart && existingCart.data !== null && existingCart.status === 200) {
            const cartId = existingCart.data._id;

            // Check if the product is already in the cart
            const existingProduct = existingCart.data.products.find(
                (item: any) =>
                    item.productId === product.productId &&
                    item.color === product.color &&
                    item.size === product.size
            );

            if (existingProduct) {
                // If the product already exists in the cart, update its quantity
                const updatedProduct = {
                    productId: existingProduct.productId,
                    color: existingProduct.color,
                    size: existingProduct.size,
                    quantity: existingProduct.quantity + product.quantity,
                };

                const res = await userRequest.put(`/cart/${cartId}/quantity/update`, updatedProduct);
                return res.data;
            } else {
                // If the product is not in the cart, use the new route to add it to the cart
                const res = await userRequest.put(`/cart/${cartId}/add`, {
                    productId: product.productId,
                    color: product.color,
                    size: product.size,
                    quantity: product.quantity,
                });

                return res.data;
            }
        } else {
            // If the cart doesn't exist, create a new one with the product
            const newCart = {
                userId,
                products: [product],
            };

            const res = await userRequest.post("/cart", newCart);
            return res.data;
        }
    } catch (error) {
        throw new Error("Failed to add product to cart");
    }
};


export default login;
