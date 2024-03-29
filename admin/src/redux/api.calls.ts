import { Dispatch } from "redux";
import {
    addUserFailure,
    addUserStart,
    addUserSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    getUserFailure,
    getUserStart,
    getUserSuccess,
    loginFailure,
    loginStart,
    loginSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess, User,
} from "./user.slice";
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
    getProductSuccess, Product,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
} from "./productsSlice";
import  { INewUser } from "../pages/new-user.page";


interface LoginUser {
    username: string;
    password: string
}

interface ProductNew {
    img: string;
    size: string[];
    altImg: string;
}



export const login = async (dispatch: Dispatch, user: LoginUser) => {
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
        console.log(e);
        dispatch(getProductFailure());
    }
};
export const getUsers = async (dispatch: Dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await userRequest.get("/users");

        dispatch(getUserSuccess(res.data));
    } catch (e) {
        dispatch(getUserFailure());
    }
};

export const deleteProduct = async (id: string, dispatch: Dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(res.data));
    } catch (e) {
        console.log(e);
        dispatch(deleteProductFailure());
    }
};
export const deleteUser = async (id: string, dispatch: Dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(res.data));
    } catch (e) {
        console.log(e);
        dispatch(deleteUserFailure());
    }
};

export const updateProduct = async (
    id: string,
    product: Product,
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

export const updateUser = async (id: string, user: User, dispatch: Dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({ id, user }));
        return res.data;
    } catch (e) {
        console.log(e);
        dispatch(updateUserFailure());
        throw e;
    }
};



export const addProduct = async (product: ProductNew, dispatch: Dispatch) => {
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


export const addUser = async (user: INewUser, dispatch: Dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await userRequest.post("/auth/register", user);
        dispatch(addUserSuccess(res.data));
        return res.data;
    } catch (e) {
        console.log(e);
        dispatch(addUserFailure());
        throw e;
    }
};
