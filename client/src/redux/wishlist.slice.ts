import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../components/products.component";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [] as IProduct[],
    },
    reducers: {
        addProductWishlist: (state, action: PayloadAction<any>) => {
            state.products.push(action.payload);
        },

        removeProductWishlist: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            state.products = state.products.filter(
                (product) => product._id !== productId.toString()
            );
        },

        clearWishlist: (state) => {
            state.products = [];
        },
    },
});

export const { addProductWishlist, removeProductWishlist, clearWishlist } =
    wishlistSlice.actions;
export default wishlistSlice.reducer;
