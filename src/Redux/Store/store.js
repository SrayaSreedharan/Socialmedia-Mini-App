import { configureStore } from "@reduxjs/toolkit";
import SignupReducer  from '../Slice/Authslice'

export const store=configureStore({
    reducer:{
        user:SignupReducer,
    },
})