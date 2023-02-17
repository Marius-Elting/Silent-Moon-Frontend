import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertIsVisible: false,
    alertMessage: "A",
    alertColor: "red",
    alertType: "error",
    loadingComponent: [],
    isLoading: false
};


const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showAlert(state, action) {
            state.alertIsVisible = true;
            state.alertType = action.payload.type;
            state.alertMessage = action.payload.message;
            state.alertColor = action.payload.color;
        },
        unshowAlert(state, action) {
            state.alertIsVisible = false;
        },
        showLoading(state, action) {
            state.isLoading = true;
        },
        unShowLoading(state, action) {
            state.isLoading = false;
        },
        setLoadingComponent(state, action) {
            state.loadingComponent.push(action.payload);
        },
        unsetLoadingComponent(state, action) {
            const i = state.loadingComponent.indexOf(action.payload);
            // console.log(i);
            // state.loadingComponent = state.loadingComponent.splice(i, 1);
            let a = state.loadingComponent.slice(0, i);
            let b = state.loadingComponent.slice(i + 1);
            state.loadingComponent = a.concat(b);
        }
    }
});



export const uiActions = uiSlice.actions;

export default uiSlice;