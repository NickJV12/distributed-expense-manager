import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: null,
  loading: false,
};

const analyticsSlice = createSlice({
  name: "analytics",

  initialState,

  reducers: {
    setSummary(state, action) {
      state.summary = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setSummary,
  setLoading,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;