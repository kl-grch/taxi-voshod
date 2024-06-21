import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/app/components/filter/filterSlice";
import pageNumberSlice from "@/app/pageNumberSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    pageNumber: pageNumberSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
