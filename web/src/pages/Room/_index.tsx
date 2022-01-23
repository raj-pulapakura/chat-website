import { Reply } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { InviteUserButton } from "../../components/buttons/InviteUserButton";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { Spacing } from "../../components/Spacing";
import { ChatFeed } from "../../features/ChatFeed/_index";
import { ChatSender } from "../../features/ChatSender/_index";
import { graphqlClient } from "../../graphql/client";
import { useRoomQuery } from "../../graphql/generated";
import { appTheme } from "../../theme";
import { useDispatch } from "react-redux";
import { roomSlice } from "../../store";

interface RoomPageProps {}

export const RoomPage: React.FC<RoomPageProps> = ({}) => {
  const { id: roomId } = useParams() as { id: string };

  const { data: roomData } = useRoomQuery(
    graphqlClient,
    { roomId },
    { refetchInterval: 1000 }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roomSlice.actions.setCurrentRoomId(roomId));
  }, [roomId]);

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
        <InviteUserButton startIcon={<Reply />}>
          Send Invite Request
        </InviteUserButton>
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
          <ChatFeed sx={{ marginBottom: "4rem" }} />
        </>
      )}
      <ChatSender />
    </Box>
  );
};
