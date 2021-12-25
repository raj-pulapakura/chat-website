import { Box, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useCurrentRoomChatData } from "../../../../hooks/useCurrentRoomChatData";
import { StoreState } from "../../../../store";
import { theme } from "../../../../theme";
import { ChatDisplay } from "./ChatDisplay";
import { ChatInput } from "./ChatInput";
import { NoChats } from "./NoChats";

interface ChatAreaProps {}

export const ChatArea: React.FC<ChatAreaProps> = ({}) => {
  const drawerWidth = useSelector<StoreState>(
    (state) => state.design.drawerWidth
  ) as StoreState["design"]["drawerWidth"];

  const useStyles = makeStyles({
    chatArea: {
      width: `calc(100% - ${drawerWidth})`,
      height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 3.5rem)`,
      marginLeft: drawerWidth,
      position: "relative",
      // background: "blue",
    },
  });

  const classes = useStyles();
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const { data: chatData } = useCurrentRoomChatData();

  return (
    <Container className={classes.chatArea} ref={chatAreaRef}>
      {chatData?.chatsByRoom.length ? (
        <>
          <ChatDisplay />
          <ChatInput />
        </>
      ) : (
        <>
          <ChatInput />
          <NoChats />
        </>
      )}
    </Container>
  );
};
