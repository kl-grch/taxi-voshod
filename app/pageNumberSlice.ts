import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PageNumberState {
  value: number;
}

const initialState: PageNumberState = {
  value: 1,
};

export const pageNumberSlice = createSlice({
  name: "pageNumber",
  initialState,
  reducers: {
    getNumberPage: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { getNumberPage } = pageNumberSlice.actions;
export default pageNumberSlice.reducer;
