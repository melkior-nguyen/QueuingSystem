import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";
import { collection, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { systemHistoryType } from "../../type";

const historyCollectionRef = collection(db, 'history')

//fetch history list 
export const fetchHistorys = createAsyncThunk(
    'history/fetchHistory',
    async () => {
        const snapshot = await getDocs(historyCollectionRef)
        const historyList = snapshot.docs.map((doc: any) => {
            return { ...doc.data() }
        })
        return historyList
    }
)
//add new history 
export const addHistory = createAsyncThunk(
    'history/addHistory',
    async (newHistory: any) => {
        await addDoc(historyCollectionRef, newHistory)
        return newHistory
    }
)

// history slice 
const historySlice = createSlice({
    name: 'history',
    initialState: {
        historyList: [] as systemHistoryType[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistorys.fulfilled, (state, action) => {
                state.historyList = action.payload
            })
            .addCase(addHistory.fulfilled, (state, action) => {
                state.historyList.push(action.payload)
            })
    }
})
export default historySlice.reducer