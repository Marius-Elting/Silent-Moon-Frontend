import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertIsVisible: false,
    alertMessage: "",
    alertColor: "",
    alertType: "",
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
        unshowAlert(state, _) {
            state.alertIsVisible = false;
        },
        showLoading(state, _) {
            state.isLoading = true;
        },
        unShowLoading(state, _) {
            state.isLoading = false;
        },
        setLoadingComponent(state, action) {
            state.loadingComponent.push(action.payload);
        },
        unsetLoadingComponent(state, action) {
            const i = state.loadingComponent.indexOf(action.payload);
            let a = state.loadingComponent.slice(0, i);
            let b = state.loadingComponent.slice(i + 1);
            state.loadingComponent = a.concat(b);
        }
    }
});



export const uiActions = uiSlice.actions;

export default uiSlice;