import { createSlice } from "@reduxjs/toolkit";
import { ResponseUrl } from "@/types/urlTypes";

import { RootState } from "../store";

const initialState = {
    urls: {} as ResponseUrl | null,
};

export const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {
        setUrls: (state, action) => {
            state.urls = action.payload;
        },
    },
});

export const { setUrls } = urlSlice.actions;
export const selectUrls = (state: RootState) => state.url.urls;
export default urlSlice.reducer;
