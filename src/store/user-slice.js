import { create } from "@mui/material/styles/createTransitions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    token: null,
    favorites: null,
}

export const fetchLogin = createAsyncThunk("/user/login", async () => {

})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.userData = action.payload.user;
            state.token = action.payload.token;
            state.favorites = action.payload.user.favorites
        }
    }
})



export const userActions = userSlice.actions

export default userSlice