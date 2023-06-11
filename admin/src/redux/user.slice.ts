import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    currentUser: any;
    isFetching: boolean;
    error: boolean;
}

const initialState: UserState = {
    currentUser: {},
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
        loginSuccess: (state, action: PayloadAction<UserState>) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            console.log("Error occurred");
        },
    },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
