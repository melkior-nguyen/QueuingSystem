import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../Firebase/config";
import { collection, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { deviceDataType } from "../type";
import { buildQueries } from "@testing-library/react";

const deviceCollectionRef = collection(db, 'device')

//fetch device list 
export const fetchDevices = createAsyncThunk(
    'device/fetchDevice',
    async () => {
        const snapshot = await getDocs(deviceCollectionRef)
        const deviceList = snapshot.docs.map((doc: any) => {
            return { ...doc.data() }
        })
        return deviceList
    }
)
//add new device 
export const addDevice = createAsyncThunk(
    'device/addDevice',
    async (newDevice: any) => {
        await addDoc(deviceCollectionRef, newDevice)
        return newDevice
    }
)

//update device 
export const updateDevice = createAsyncThunk(
    'device/updateDevice',
    async ({ updateDeviceInfo, currIndex }: any) => {
        const snapshot = await getDocs(deviceCollectionRef)
        const idList: string[] = []
        //get id
        snapshot.forEach(doc => idList.push(doc.id))
        //update with currIndex 
        const currDoc = doc(db, 'device', idList[currIndex])
        console.log(updateDeviceInfo)
        await updateDoc(currDoc, updateDeviceInfo)
        return { updateDeviceInfo, currIndex }
    }
)

//device slice

const deviceSlice = createSlice({
    name: 'device',
    initialState: {
        deviceList: [] as deviceDataType[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevices.fulfilled, (state, action) => {
                state.deviceList = action.payload
            })
            .addCase(addDevice.fulfilled, (state, action) => {
                state.deviceList.push(action.payload)
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                const updateDevice = {...action.payload.updateDeviceInfo}
                state.deviceList[action.payload.currIndex] = updateDevice
            })
    }
})

export default deviceSlice.reducer