import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groups: [],
    loading: false,
};

const groupSlice = createSlice({
    name: "groups",
    initialState,
    reducers: {
        setGroups(state, action){
            state.groups = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        },
    },
});

export const {
    setGroups,
    setLoading,
} = groupSlice.actions;

export default groupSlice.reducer;