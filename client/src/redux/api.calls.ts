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
        const existingWishlist = await userRequest.get(`/wishlist/find/${userId}`);

        if (existingWishlist) {
            const wishlistId = existingWishlist.data._id;

            const updatedWishlist = {
                userId: userId,
                productId: [...existingWishlist.data.productId, productId],
            };

            const res = await userRequest.put(`/wishlist/${wishlistId}`, updatedWishlist);
            return res.data;
        } else {
            const newWishlist = {
                userId: userId,
                productId: [productId],
            };
            const res = await userRequest.post("/wishlist", newWishlist);
            return res.data;
        }
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
