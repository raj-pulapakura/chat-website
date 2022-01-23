import { Box } from "@mui/material";
import React from "react";
import { Spacing } from "../../components/Spacing";
import { graphqlClient } from "../../graphql/client";
import { useMeQuery } from "../../graphql/generated";
import { RoomListItem } from "./RoomListItem";

interface RoomsListProps {}

export const RoomsList: React.FC<RoomsListProps> = ({}) => {
  const { data: meData } = useMeQuery(graphqlClient, {});

  return (
    <>
      {meData?.me.account?.rooms.map((room) => (
        <Box key={room.id}>
          <RoomListItem room={room} />
          <Spacing height="1rem" />
        </Box>
      ))}
    </>
  );
};
