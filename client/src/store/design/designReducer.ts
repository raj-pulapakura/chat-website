import { DesignAction, DesignState, DesignTypes } from "./designTypes";

const initialState: DesignState = {
  drawerWidth: "",
  chatInputHeight: 0,
};

export const designReducer = (
  state: DesignState = initialState,
  action: DesignAction
): DesignState => {
  const { type } = action;
  let payload = action.payload;
  switch (type) {
    case DesignTypes.SET_DRAWER_WIDTH:
      payload = action.payload;
      return {
        ...state,
        drawerWidth: payload,
      };
    case DesignTypes.SET_CHAT_INPUT_HEIGHT:
      payload = action.payload;
      return {
        ...state,
        chatInputHeight: payload,
      };
    default:
      return state;
  }
};
