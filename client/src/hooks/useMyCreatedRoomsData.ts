import { graphqlClient } from "../graphql/client";
import { useMeQuery, useRoomsByCreatorQuery } from "../graphql/generated";

export const useMyCreatedRoomsData = () => {
  const { data: meData } = useMeQuery(graphqlClient);
  return useRoomsByCreatorQuery(
    graphqlClient,
    { creatorId: meData?.me?.id as string },
    { enabled: !!meData?.me }
  );
};
