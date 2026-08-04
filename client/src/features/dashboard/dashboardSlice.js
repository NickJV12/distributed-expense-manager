import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    summary: null,
    loading: false,
};

const dashboardSlice = createSlice({
    name: "dashboard",

    initialState,

    reducers: {
        setLoading(state, action){
            state.loading = action.payload;
        },

        setSummary(state, action){
            state.summary = action.payload;
        },
    },
});

export const {
    setLoading,
    setSummary,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;