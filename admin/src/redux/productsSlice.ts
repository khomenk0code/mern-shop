import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    user: any;
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
    inStock: boolean;
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
        deleteProductSuccess: (state, action: PayloadAction<Product>) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Update one product
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess: (
            state,
            action: PayloadAction<{ id: string; product: Product }>
        ) => {
            state.isFetching = false;
            const index = state.products.findIndex(
                (item) => item._id === action.payload.id
            );
            if (index !== -1) {
                state.products[index] = action.payload.product;
            }
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //Add one product
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action: PayloadAction<Product>) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductSuccess,
    deleteProductStart,
    deleteProductFailure,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
} = ProductSlice.actions;
export default ProductSlice.reducer;
