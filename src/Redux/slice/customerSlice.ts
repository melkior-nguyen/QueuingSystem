import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { customerDataType } from "../../type";

const customerCollectionRef = collection(db, 'customer')

//fetch device list 
export const fetchCustomer = createAsyncThunk(
    'customer/fetchCustomer',
    async () => {
        const snapshot = await getDocs(customerCollectionRef)
        const customerList = snapshot.docs.map((doc: any) => {
            return { ...doc.data() }
        })
        return customerList
    }
)
//add new device 
export const addCustomer = createAsyncThunk(
    'customre/addCustomer',
    async (newCustomer: any) => {
        await addDoc(customerCollectionRef, newCustomer)
        return newCustomer
    }
)

// customer slice
const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customerList: [] as customerDataType[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomer.fulfilled, (state, action) => {
                state.customerList = action.payload
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customerList.push(action.payload)
            })
    }
})

export default customerSlice.reducer