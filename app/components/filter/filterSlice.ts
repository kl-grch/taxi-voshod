import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  filters: string[];
}

const initialState: FilterState = {
  filters: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.filters = [];
    },
    getFilters: (state, action: PayloadAction<string>) => {
      if (state.filters.includes(action.payload)) {
        let index = state.filters.indexOf(action.payload);
        if (index > -1) {
          state.filters.splice(index, 1);
        }
      } else {
        state.filters.push(action.payload);
      }
    },
  },
});

export const { resetFilter, getFilters } = filterSlice.actions;
export default filterSlice.reducer;
