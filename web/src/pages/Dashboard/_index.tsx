import { Button, Typography } from "@mui/material";
import React from "react";
import { CreateRoomActivator } from "../../components/activators/CreateRoomActivator";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { Spacing } from "../../components/Spacing";
import { RoomsList } from "../../features/RoomsList/_index";
import { graphqlClient } from "../../graphql/client";
import { useMeQuery } from "../../graphql/generated";

interface DashboardPageProps {}

export const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const { data: meData } = useMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );
  const userHasRooms = !!meData?.me.account?.rooms.length;

  return (
    <>
      {userHasRooms ? (
        <>
          <CreateRoomActivator>Create a Room</CreateRoomActivator>
          <Spacing height="1rem" />
          <RoomsList />
        </>
      ) : (
        <>
          <PrimeWrapper>
            <Typography>You do not have rooms</Typography>
            <Spacing height="1rem" />
            <CreateRoomActivator>Create a Room</CreateRoomActivator>
          </PrimeWrapper>
        </>
      )}
    </>
  );
};
