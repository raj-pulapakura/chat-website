import { Reply } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { InviteUserActivator } from "../../components/activators/InviteUserActivator";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { Spacing } from "../../components/Spacing";
import { ChatFeed } from "../../features/ChatFeed/_index";
import { ChatSender } from "../../features/ChatSender/_index";
import { graphqlClient } from "../../graphql/client";
import { useRoomQuery } from "../../graphql/generated";
import { appTheme, colors } from "../../theme";

interface RoomPageProps {}

export const RoomPage: React.FC<RoomPageProps> = ({}) => {
  const { id } = useParams() as { id: string };

  const { data: roomData } = useRoomQuery(
    graphqlClient,
    { roomId: id },
    { refetchInterval: 1000 }
  );

  const noChats = !roomData?.room.room?.chats.length;

  return (
    <Box>
      <PrimeWrapper
        sx={{
          color: appTheme.palette.secondary.main,
          textAlign: "center",
          background: appTheme.palette.primary.main,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          {roomData?.room?.room?.title}
        </Typography>
        <Spacing height="1rem" />
        <InviteUserActivator startIcon={<Reply />}>
          Send Invite Request
        </InviteUserActivator>
      </PrimeWrapper>
      {noChats ? (
        <>
          <Spacing height="1rem" />
          <PrimeWrapper>
            <Typography>
              There are currently no chats. Send the first one to ignite the
              conversation 😀
            </Typography>
          </PrimeWrapper>
        </>
      ) : (
        <>
          <Spacing height="1rem" />
          <ChatFeed sx={{ marginBottom: "4rem" }} roomId={id} />
        </>
      )}
      <ChatSender roomId={id} />
    </Box>
  );
};
