import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../components/products.component";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [] as IProduct[],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action: PayloadAction<any>) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
    },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
