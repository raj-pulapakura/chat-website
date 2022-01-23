import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoomInitialState {
  currentRoomId: string;
}

const roomInitialState = {
  currentRoomId: "",
};

export const roomSlice = createSlice({
  name: "room",
  initialState: roomInitialState,
  reducers: {
    setCurrentRoomId: (state, action: PayloadAction<string>) => {
      state.currentRoomId = action.payload;
    },
  },
});
