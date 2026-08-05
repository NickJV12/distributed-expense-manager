import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import groupReducer from "../features/groups/groupSlice";
import expenseReducer from "../features/expenses/expenseSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        groups: groupReducer,
        expenses: expenseReducer,
        analytics: analyticsReducer,
    },
});