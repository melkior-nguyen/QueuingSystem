import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../Firebase/config";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { userType } from "../../type";

const userCollectionRef = collection(db, 'users')
const currUserCollectionRef = collection(db, 'currentuser')

// get user list
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const snapshot = await getDocs(userCollectionRef)
        const userList = snapshot.docs.map((doc: any) => ({ ...doc.data() }))
        return userList
    }
)
// update new password
export const updatePassword = createAsyncThunk(
    'users/updatePassword',
    async (updatedPassword: { newPassword: string, id: number }) => {
        const snapshot = await getDocs(userCollectionRef)
        //get id from docs
        const userDocIds: string[] = []
        snapshot.forEach(doc => userDocIds.push(doc.id))
        //get current doc from id
        const currDoc = doc(db, 'users', userDocIds[updatedPassword.id])
        // get data from curr doc
        const currUserData = snapshot.docs.find(doc => doc.data().id === updatedPassword.id)
        // update
        await updateDoc(currDoc, { ...currUserData?.data(), password: updatedPassword.newPassword })
        return updatedPassword
    }
)
// update login user to render user info
export const updateCurrentUser = createAsyncThunk(
    'users/updateCurrentUser',
    async (loginUser: userType) => {
        const snapshot = await getDocs(currUserCollectionRef)
        //get id from docs
        const userDocIds: string[] = []
        snapshot.forEach(doc => userDocIds.push(doc.id))
        //get current doc from id
        const currDoc = doc(db, 'currentuser', userDocIds[0])
        // update
        await updateDoc(currDoc, loginUser)
        return loginUser
    }
)

// get current user
export const fetchCurrUser = createAsyncThunk(
    'users/fetchCurrUser',
    async () => {
        const snapshot = await getDocs(currUserCollectionRef)
        const userList = snapshot.docs.map((doc: any) => ({ ...doc.data() }))
        return userList[0]
    }
)

// add user 
export const addUser = createAsyncThunk(
    'user/addUser',
    async (newuser: any) => {
        await addDoc(userCollectionRef, newuser)
        return newuser
    }
)

//update user 
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ updateAccountInfo, currIndex }: any) => {
        const snapshot = await getDocs(userCollectionRef)
        const idList: string[] = []
        //get id
        snapshot.forEach(doc => idList.push(doc.id))
        //update with currIndex 
        const currDoc = doc(db, 'users', idList[currIndex])
        console.log(updateAccountInfo)
        await updateDoc(currDoc, updateAccountInfo)
        return { updateAccountInfo, currIndex }
    }
)

// user slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        usersList: [] as userType[],
        currUser: {} as userType
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersList = action.payload
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.usersList[action.payload.id].password = action.payload.newPassword
            })
            .addCase(updateCurrentUser.fulfilled, (state, action) => {
                state.currUser = action.payload
            })
            .addCase(fetchCurrUser.fulfilled, (state, action) => {
                state.currUser = action.payload
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.usersList.push(action.payload)
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updateUser = { ...action.payload.updateAccountInfo }
                state.usersList[action.payload.currIndex] = updateUser
            })

    }
})

// const {actions, reducer} = userSlice
export default userSlice.reducer
