import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    token: null,
    favorites: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.userData = {
                _id: action.payload.user._id,
                firstname: action.payload.user.firstname,
                lastname: action.payload.user.lastname,
                email: action.payload.user.email,
                remindTime: action.payload.user.remindTime,
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
        },
        setRemindTime(state, action) {
            state.userData.remindTime = action.payload.remindTime;
        }

    }
});



export const userActions = userSlice.actions;

export default userSlice;