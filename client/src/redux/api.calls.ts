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

export const addToWishlist = async (product: any, userId: any) => {
    try {
        const wishlistItem = { ...product, userId };
        const res = await userRequest.post("/wishlist", wishlistItem);
        return res.data;
    } catch (error) {
        throw new Error("Failed to add product to wishlist");
    }
};


export const removeFromWishlist = async (productId: any) => {
    try {
        const res = await userRequest.delete(`/wishlist/${productId}`);
        return res.data;
    } catch (error) {
        throw new Error("Failed to remove product from wishlist");
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

export default login;
