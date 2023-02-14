import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        ui: uiSlice.reducer
    }
})

export default store