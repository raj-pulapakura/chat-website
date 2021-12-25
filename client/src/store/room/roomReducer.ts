import { RoomAction, RoomState, RoomTypes } from "./roomTypes";

const initialState: RoomState = {
  currentRoomId: "",
  createdRoomId: "",
};

export const roomReducer = (
  state: RoomState = initialState,
  action: RoomAction
): RoomState => {
  const { type, payload } = action;
  switch (type) {
    case RoomTypes.SET_CURRENT_ROOM_ID:
      return {
        ...state,
        currentRoomId: payload,
      };
    case RoomTypes.SET_CREATED_ROOM_ID:
      return {
        ...state,
        createdRoomId: payload,
      };
    default:
      return state;
  }
};
