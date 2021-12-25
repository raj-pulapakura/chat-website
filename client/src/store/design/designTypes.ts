export enum DesignTypes {
  SET_DRAWER_WIDTH = "SET_DRAWER_WIDTH",
  SET_CHAT_INPUT_HEIGHT = "SET_CHAT_INPUT_HEIGHT",
}

export interface DesignState {
  drawerWidth: string;
  chatInputHeight: number;
}

export interface SetDrawerWidthAction {
  type: DesignTypes.SET_DRAWER_WIDTH;
  payload: string;
}

export interface SetChatInputHeightAction {
  type: DesignTypes.SET_CHAT_INPUT_HEIGHT;
  payload: number;
}

export type DesignAction = SetDrawerWidthAction | SetChatInputHeightAction;
