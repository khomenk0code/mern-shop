import { loginFailure, loginStart, loginSuccess } from "./user.slice";
import { publicRequest } from "../utils/requestMethods";

const login = async (dispatch: any, user: any) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (e) {
        dispatch(loginFailure());
    }
};

export default login;
