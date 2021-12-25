import { createStore } from "redux";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { RoomState } from "./room/roomTypes";
import { DesignState } from "./design/designTypes";

export interface StoreState {
  room: RoomState;
  design: DesignState;
}

export const store = createStore(rootReducer, composeWithDevTools());
