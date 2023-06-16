import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
}

interface UserState {
    currentUser: any;
    users: any[];
    isFetching: boolean;
    error: boolean;
}

const initialState: UserState = {
    currentUser: {},
    users: [],
    isFetching: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //Login
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
        //Get all users
        getUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.isFetching = false;
            state.users = action.payload
            state.error = false;
        },
        getUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // Delete one user
        deleteUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserSuccess: (state, action: PayloadAction<User>) => {
            state.isFetching = false;
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteUserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure ,
    getUserFailure,
    getUserSuccess,
    getUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    deleteUserStart,

} = userSlice.actions;
export default userSlice.reducer;
