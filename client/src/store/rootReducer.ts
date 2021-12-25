import { combineReducers } from "redux";
import { roomReducer } from "./room/roomReducer";
import { designReducer } from "./design/designReducer";

export const rootReducer = combineReducers({
  room: roomReducer,
  design: designReducer,
});
