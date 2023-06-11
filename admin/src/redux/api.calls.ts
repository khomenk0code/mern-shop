import { loginFailure, loginStart, loginSuccess } from "./user.slice";
import { publicRequest } from "../utils/requestMethods";
import { getProductFailure, getProductStart, getProductSuccess } from "./productsSlice";
import { Dispatch } from "redux";

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
