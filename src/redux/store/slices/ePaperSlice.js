import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../utils/status";
import { fetchAllEpaperFeed, fetchEpaperSettings, fetchSingleEpaper } from "../../util/ePaperUtils";

const initialState = {
    error: null,
    status: STATUS.IDLE,
    settings: null,
    articleFeeds: null,
    singleFeed: null
};

const ePaperSlice = createSlice({
    name: "ePaper",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // handling fetching of ePaper settings
            .addCase(fetchEpaperSettings.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchEpaperSettings.fulfilled, (state, action) => {
                state.settings = action.payload;
                state.status = STATUS.SUCCEEDED;
            })
            .addCase(fetchEpaperSettings.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = STATUS.FAILED;
            })

            // handling fetching of all epaperfeed
            .addCase(fetchAllEpaperFeed.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchAllEpaperFeed.fulfilled, (state, action) => {
                state.articleFeeds = action.payload;
                state.status = STATUS.SUCCEEDED;
            })
            .addCase(fetchAllEpaperFeed.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.error.message;
            })

            // handling fetching of single epaper feed
            .addCase(fetchSingleEpaper.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(fetchSingleEpaper.fulfilled, (state, action) => {
                state.singleFeed = action.payload;
                state.status = STATUS.SUCCEEDED;
            })
            .addCase(fetchSingleEpaper.rejected, (state, action) => {
                state.status = STATUS.FAILED;
                state.error = action.error.message;
            })
    },
});

export default ePaperSlice.reducer;