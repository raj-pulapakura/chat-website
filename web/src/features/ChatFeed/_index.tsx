import { Box, BoxProps } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { graphqlClient } from "../../graphql/client";
import { useRoomQuery } from "../../graphql/generated";
import { StoreState } from "../../store";
import { ChatFeedBox } from "./ChatFeedBox";

type ChatFeedProps = {
  roomId: string;
} & BoxProps;

export const ChatFeed: React.FC<ChatFeedProps> = ({ roomId, ...props }) => {
  const { data: roomData } = useRoomQuery(graphqlClient, { roomId });

  const chatFeedRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [roomData?.room.room?.chats]);

  return (
    <Box {...props}>
      {roomData?.room?.room?.chats.map((chat) => (
        <ChatFeedBox chat={chat} />
      ))}
    </Box>
  );
};
