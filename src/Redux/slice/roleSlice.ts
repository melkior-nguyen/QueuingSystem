import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";
import { collection, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { deviceDataType, systemRoleDataType } from "../../type";

const roleCollectionRef = collection(db, 'role')

//fetch role list  
export const fetchRoles = createAsyncThunk(
    'role/fetchRole',
    async () => {
        const snapshot = await getDocs(roleCollectionRef)
        const roleList = snapshot.docs.map((doc: any) => {
            return { ...doc.data() }
        })
        return roleList
    }
)
//add new role 
export const addRole = createAsyncThunk(
    'role/addRole',
    async (newRole: any) => {
        await addDoc(roleCollectionRef, newRole)
        return newRole
    }
)

//update role 
export const updateRole = createAsyncThunk(
    'role/updateRole',
    async ({ updateRoleInfo, currIndex }: any) => {
        const snapshot = await getDocs(roleCollectionRef)
        const idList: string[] = []
        //get id
        snapshot.forEach(doc => idList.push(doc.id))
        //update with currIndex 
        const currDoc = doc(db, 'role', idList[currIndex])
        await updateDoc(currDoc, updateRoleInfo)
        return { updateRoleInfo, currIndex }
    }
)

//Role slice

const roleSlice = createSlice({
    name: 'role',
    initialState: {
        roleList: [] as systemRoleDataType[]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roleList = action.payload
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.roleList.push(action.payload)
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                const updateRole = { ...action.payload.updateRoleInfo }
                state.roleList[action.payload.currIndex] = updateRole
            })
    }
})

export default roleSlice.reducer