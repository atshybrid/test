import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../api/axios";

export const fetchEpaperSettings = createAsyncThunk(
    "ePaper/fetchEpaperSettings",
    async () => {
        try {
            const { data } = await fetchData('api/epapersettings/');
            console.log("Data ==>", data);
            return data;
        } catch (error) {
            throw Error("Failed to fetch ePaper settings.");
        }
    }
);

export const fetchAllEpaperFeed = createAsyncThunk(
    "ePaper/fetchAllEpaperFeed",
    async () => {
        try {
            const { data } = await fetchData('api/getallepaperfeed/');
            console.log("Data ==>", data);
            return data;
        } catch (error) {
            throw Error("Failed to fetch all ePaper feed.");
        }
    }
);

export const fetchSingleEpaper = createAsyncThunk(
    "ePaper/fetchSingleEpaper",
    async (epaperId) => {
        try {
            const { data } = await fetchData(`api/getepaperfeed/${epaperId}/`);
            console.log("Data ==>", data);
            return data;
        } catch (error) {
            throw Error("Failed to fetch single ePaper.");
        }
    }
);
