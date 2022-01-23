import { combineReducers } from "@reduxjs/toolkit";
import { DesignInitialState, designSlice } from "./features/design";
import { RoomInitialState, roomSlice } from "./features/room";

export interface StoreState {
  design: DesignInitialState;
  room: RoomInitialState;
}

export const rootReducer = combineReducers({
  design: designSlice.reducer,
  room: roomSlice.reducer,
});
