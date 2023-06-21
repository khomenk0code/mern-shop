import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../components/products.component";

interface UpdateProductQuantityPayload {
    productId: string;
    quantity: number;
    color: string;
    size: string;
}
interface removeProductPayload {
    productId: string;
    color?: string;
    size?: string;
}

const cartSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [] as IProduct[],
    },
    reducers: {
        addProductWishlist: (state, action: PayloadAction<any>) => {

            state.products.push(action.payload);

        },
        removeProductWishlist: (
            state,
            action: PayloadAction<removeProductPayload>
        ) => {


        },



        clearWishlist: (state) => {
            state.products = [];
        },
    },
});

export const { addProductWishlist, removeProductWishlist, clearWishlist } =
    cartSlice.actions;
export default cartSlice.reducer;
