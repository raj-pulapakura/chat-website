import { graphqlClient } from "../graphql/client";
import { useMeQuery, useRoomsByUserQuery } from "../graphql/generated";

export const useMyRoomsData = () => {
  const { data: meData } = useMeQuery(graphqlClient);
  return useRoomsByUserQuery(
    graphqlClient,
    { userId: meData?.me?.id as string },
    { enabled: !!meData?.me }
  );
};
