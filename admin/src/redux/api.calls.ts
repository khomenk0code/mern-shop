import { Dispatch } from "redux";
import { loginFailure, loginStart, loginSuccess } from "./user.slice";
import { publicRequest, userRequest } from "../utils/requestMethods";
import {
    addProductFailure,
    addProductStart,
    addProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    getProductFailure,
    getProductStart,
    getProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
} from "./productsSlice";

export const login = async (dispatch: Dispatch, user: any) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (e) {
        dispatch(loginFailure());
    }
};

export const getProducts = async (dispatch: Dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (e) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id: number, dispatch: Dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(res.data));
    } catch (e) {
        console.log(e);
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (
    id: string,
    product: any,
    dispatch: Dispatch
) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess({ id, product }));
        return res.data;
    } catch (e) {
        console.log(e);
        dispatch(updateProductFailure());
        throw e;
    }
};

export const addProduct = async (product: any, dispatch: Dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post("/products", product);
        dispatch(addProductSuccess(res.data));
        return res.data;
    } catch (e) {
        console.log(e);
        dispatch(addProductFailure());
        throw e;
    }
};
