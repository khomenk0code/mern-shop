import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../components/products.component";

interface IWishlistState {
    products: IProduct[];
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [] as IProduct[],
    } as IWishlistState,
    reducers: {
        addProductWishlist: (state, action: PayloadAction<any>) => {
            state.products.push(action.payload);
        },

        removeProductWishlist: (state, action: PayloadAction<any>) => {
            const productIds = action.payload;
            state.products = state.products.filter(
                (product) => !productIds.includes(product._id)
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
