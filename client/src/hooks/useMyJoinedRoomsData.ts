import { graphqlClient } from "../graphql/client";
import { useMeQuery, useRoomsByJoinQuery } from "../graphql/generated";

export const useMyJoinedRoomsData = () => {
  const { data: meData } = useMeQuery(graphqlClient);
  return useRoomsByJoinQuery(
    graphqlClient,
    { userId: meData?.me?.id as string },
    { enabled: !!meData?.me }
  );
};
