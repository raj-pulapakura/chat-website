import { graphqlClient } from "../graphql/client";
import { useGetChatsByRoomQuery } from "../graphql/generated";
import { useSelector } from "react-redux";
import { StoreState } from "../store";

export const useCurrentRoomChatData = () => {
  const currentRoomId = useSelector<StoreState>(
    (state) => state.room.currentRoomId
  ) as StoreState["room"]["createdRoomId"];

  return useGetChatsByRoomQuery(
    graphqlClient,
    { roomId: currentRoomId },
    { refetchInterval: 1000 }
  );
};
