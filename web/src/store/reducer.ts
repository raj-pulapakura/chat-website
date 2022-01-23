import { combineReducers } from "@reduxjs/toolkit";
import { DesignInitialState, designSlice } from "./features/design";

export interface StoreState {
  design: DesignInitialState;
}

export const rootReducer = combineReducers({
  design: designSlice.reducer,
});
