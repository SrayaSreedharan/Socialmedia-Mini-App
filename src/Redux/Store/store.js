import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from '../Slice/Authslice';

export const store=configureStore({
    reducer:{
        user: signupReducer,
    },
})