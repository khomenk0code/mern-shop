import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    _id: any;
    id: any;
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size: string[];
    color: string[];
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductState {
    products: Product[];
    isFetching: boolean;
    error: boolean;
}

const initialState: ProductState = {
    products: [],
    isFetching: false,
    error: false,
};

const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // Get all products
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action: PayloadAction<Product[]>) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Delete one product
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action: PayloadAction<Product[]>) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

    },
});

export const { getProductStart, getProductSuccess, getProductFailure } = ProductSlice.actions;
export default ProductSlice.reducer;
