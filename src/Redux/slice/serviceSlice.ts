import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";
import { collection, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { serviceDataType } from "../../type";

const serviceCollectionRef = collection(db, 'service')

//fetch service list 
export const fetchServices = createAsyncThunk(
    'service/fetchServices',
    async () => {
        const snapshot = await getDocs(serviceCollectionRef)
        const serviceList = snapshot.docs.map((doc: any) => {
            return { ...doc.data() }
        })
        return serviceList
    }
)
//add new service 
export const addService = createAsyncThunk(
    'service/addservice',
    async (newService: any) => {
        await addDoc(serviceCollectionRef, newService)
        return newService
    }
)

//update service 
export const updateService = createAsyncThunk(
    'service/updateservice',
    async ({ updateServiceInfo, currIndex }: any) => {
        const snapshot = await getDocs(serviceCollectionRef)
        const idList: string[] = []
        //get id
        snapshot.forEach(doc => idList.push(doc.id))
        //update with currIndex 
        const currDoc = doc(db, 'service', idList[currIndex])
        await updateDoc(currDoc, updateServiceInfo)
        return { updateServiceInfo, currIndex }
    }
)

//service slice

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        serviceList: [] as serviceDataType[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.serviceList = action.payload
            })
            .addCase(addService.fulfilled, (state, action)=> {
                state.serviceList.push(action.payload)
            })
            .addCase(updateService.fulfilled, (state, action) => {
                const updateDevice = { ...action.payload.updateServiceInfo }
                state.serviceList[action.payload.currIndex] = updateDevice
            })
    }
})

export default serviceSlice.reducer