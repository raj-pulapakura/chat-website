export enum RoomTypes {
  SET_CREATED_ROOM_ID = "SET_CREATED_ROOM_ID",
  SET_CURRENT_ROOM_ID = "SET_CURRENT_ROOM_ID",
}

export interface RoomState {
  createdRoomId: string;
  currentRoomId: string;
}

export interface SetCreatedRoomIdAction {
  type: RoomTypes.SET_CREATED_ROOM_ID;
  payload: string;
}

export interface SetCurrentRoomIdAction {
  type: RoomTypes.SET_CURRENT_ROOM_ID;
  payload: string;
}

export type RoomAction = SetCreatedRoomIdAction | SetCurrentRoomIdAction;
