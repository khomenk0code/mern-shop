import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../components/products.component";


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [] as IProduct[],
        isFetching: false,
        error: false,
    },
    reducers: {

         addProductWishlist: (state, action: PayloadAction<any>) => {
            state.products.push(action.payload);
        },

        removeProductWishlist: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const productIndex = state.products.findIndex((product: any) => {
                if (product._id === productId) {
                    return true;
                }
                return false;
            });
            if (productIndex !== -1) {
                state.products.splice(productIndex, 1);
            }
        },

        clearWishlist: (state) => {
            state.products = [];
        },
    },
});

export const {
    addProductWishlist,
    removeProductWishlist,
    clearWishlist,
} =
    wishlistSlice.actions;
export default wishlistSlice.reducer;
