import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  balances: [],
  settlements: [],
  loading: false,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,

  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },

    setBalances(state, action) {
      state.balances = action.payload;
    },

    setSettlements(state, action) {
      state.settlements = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setExpenses,
  setBalances,
  setSettlements,
  setLoading,
} = expenseSlice.actions;

export default expenseSlice.reducer;