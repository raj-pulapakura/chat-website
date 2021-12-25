import { graphqlClient } from "../graphql/client";
import { useGetRoomByIdQuery } from "../graphql/generated";
import { useSelector } from "react-redux";
import { StoreState } from "../store";

export const useCurrentRoomData = () => {
  const currentRoomId = useSelector<StoreState>(
    (state) => state.room.currentRoomId
  ) as StoreState["room"]["createdRoomId"];

  return useGetRoomByIdQuery(
    graphqlClient,
    { id: currentRoomId },
    { refetchInterval: 1000 }
  );
};
