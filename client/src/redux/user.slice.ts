import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,

    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.isFetching = false;
            state.currentUser = action.payload;
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

export const { loginStart, loginSuccess, loginFailure, loginOut } = userSlice.actions;
export default userSlice.reducer;
