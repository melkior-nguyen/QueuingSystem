import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userslice";
import deviceReducer from './deviceSlice'

import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        devices: deviceReducer
    }
})

// get type of store.getstate & store.dispatch
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

// new useSelector, useDistpach
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 
export const useAppDispatch: ()=> AppDispatch = useDispatch