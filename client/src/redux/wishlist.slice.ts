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

        removeProductWishlist: (state, action: PayloadAction<any>) => {
            const productIds = action.payload;
            const updatedProducts = state.products.filter(
                (product) => !productIds.includes(product._id)
            );
            return {
                ...state,
                products: updatedProducts
            };
        },


        clearWishlist: (state) => {
            state.products = [];
        },
    },
});

export const { addProductWishlist, removeProductWishlist, clearWishlist } =
    wishlistSlice.actions;
export default wishlistSlice.reducer;
