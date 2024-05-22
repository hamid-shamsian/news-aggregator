import { createSlice } from "@reduxjs/toolkit";
import { IAction, IFilters, ISource } from "../../@types";

const initialState: IFilters = {
  source: undefined,
  category: "",
  dateFilter: { from: "", to: "" }
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeSource: (_, action: IAction<ISource>) => ({ source: action.payload, category: "", dateFilter: { from: "", to: "" } }),

    changeCategory: (filters, action: IAction<string>) => {
      filters.category = action.payload;
    },

    changeDateFilter: (filters, action: IAction<{ from: string; to: string }>) => {
      filters.dateFilter = action.payload;
    }
  }
});

export default filtersSlice.reducer;

export const filtersActions = filtersSlice.actions;
