import { configureStore } from "@reduxjs/toolkit";
import ePaperReducer from "./slices/ePaperSlice";

const store = configureStore({
    reducer: {
        ePaper: ePaperReducer,
    }
});

export default store;