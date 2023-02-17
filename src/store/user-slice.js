import { getCardActionsUtilityClass } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    token: null,
    favorites: null,
};

export const fetchLogin = createAsyncThunk("/user/login", async () => {

});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.userData = {
                _id: action.payload.user._id,
                firstname: action.payload.user.firstname,
                lastname: action.payload.user.lastname,
                email: action.payload.user.email
            };
            state.token = action.payload.token;
            state.favorites = action.payload.user.favorites;
        },
        logout(state, action) {
            state.userData = "";
            state.token = "";
            state.favorites = [];
        },
        getFavorites(state, action) {
            state.favorites = action.payload.favorites;
        }

    }
});



export const userActions = userSlice.actions;

export default userSlice;