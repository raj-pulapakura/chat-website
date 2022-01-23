import { configureStore } from "@reduxjs/toolkit";
import { rootReducer, StoreState } from "./reducer";
import { designSlice } from "./features/design";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type { StoreState };
export { designSlice };
