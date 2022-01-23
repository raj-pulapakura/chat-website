import { Paper, Typography } from "@mui/material";
import React from "react";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { Spacing } from "../../components/Spacing";
import { graphqlClient } from "../../graphql/client";
import { MeQuery, useMeQuery } from "../../graphql/generated";
import { RoomListItem } from "./RoomListItem";

interface RoomsListProps {}

export const RoomsList: React.FC<RoomsListProps> = ({}) => {
  const { data: meData } = useMeQuery(graphqlClient, {});

  return (
    <>
      {meData?.me.account?.rooms.map((room) => (
        <>
          <RoomListItem room={room} />
          <Spacing height="1rem" />
        </>
      ))}
    </>
  );
};
