import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDraft } from "immer";

export interface User extends Document {
    _id: any;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    image?: string;
    fullName?: string;
    phone?: string;
    birthDate?: Date;
}

interface UserState {
    currentUser: User | null;
    isFetching: boolean;
    error: boolean;
}

const initialState: UserState = {
    currentUser: null,
    isFetching: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action: PayloadAction<User | null>) => {
            state.isFetching = false;
            state.currentUser = action.payload
                ? createDraft(action.payload)
                : null;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        loginOut: (state) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, loginOut } =
    userSlice.actions;
export default userSlice.reducer;
