import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesignInitialState {
  chatSenderHeight: number;
}

const designInitialState: DesignInitialState = {
  chatSenderHeight: 0,
};

export const designSlice = createSlice({
  name: "design",
  initialState: designInitialState,
  reducers: {
    setChatSenderHeight: (state, action: PayloadAction<number>) => {
      state.chatSenderHeight = action.payload;
    },
  },
});
