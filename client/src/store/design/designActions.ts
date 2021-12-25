import {
  DesignTypes,
  SetChatInputHeightAction,
  SetDrawerWidthAction,
} from "./designTypes";

export const setDrawerWidth = (drawerWidth: string): SetDrawerWidthAction => {
  return {
    type: DesignTypes.SET_DRAWER_WIDTH,
    payload: drawerWidth,
  };
};

export const setChatInputHeight = (
  chatInputHeight: number
): SetChatInputHeightAction => {
  return {
    type: DesignTypes.SET_CHAT_INPUT_HEIGHT,
    payload: chatInputHeight,
  };
};
