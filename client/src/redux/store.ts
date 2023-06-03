import cartReducer from "./cart.slice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
        reducer: {
            cart: cartReducer,
        },
    devTools: true,
    },
);