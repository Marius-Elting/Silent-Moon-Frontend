import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertIsVisible: false,
    alertMessage: "A",
    alertColor: "red",
    alertType: "error",
    isLoading: false
}


const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showAlert(state, action) {
            state.alertIsVisible = true;
            state.alertType = action.payload.type
            state.alertMessage = action.payload.message;
            state.alertColor = action.payload.color
        },
        unshowAlert(state, action) {
            state.alertIsVisible = false
        },
        showLoading(state, action) {
            state.isLoading = true
        },
        unShowLoading(state, action) {
            state.isLoading = false
        }
    }
})



export const uiActions = uiSlice.actions

export default uiSlice