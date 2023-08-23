import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/userslice";
import deviceReducer from './slice/deviceSlice'
import serviceReducer from './slice/serviceSlice'
import customerReducer from './slice/customerSlice'
import roleReducer from './slice/roleSlice'

import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        devices: deviceReducer,
        service: serviceReducer,
        customer: customerReducer,
        role: roleReducer
    }
})

// get type of store.getstate & store.dispatch
type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

// new useSelector, useDistpach
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch