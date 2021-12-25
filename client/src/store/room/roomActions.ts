import {
  RoomTypes,
  SetCreatedRoomIdAction,
  SetCurrentRoomIdAction,
} from "./roomTypes";

export const setCreatedRoomId = (roomId: string): SetCreatedRoomIdAction => {
  return {
    type: RoomTypes.SET_CREATED_ROOM_ID,
    payload: roomId,
  };
};

export const setCurrentRoomId = (roomId: string): SetCurrentRoomIdAction => {
  return {
    type: RoomTypes.SET_CURRENT_ROOM_ID,
    payload: roomId,
  };
};
