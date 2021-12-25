import { Send } from "@mui/icons-material";
import {
  InputAdornment,
  IconButton,
  FilledInput,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { graphqlClient } from "../../../../graphql/client";
import {
  useCreateChatMutation,
  useMeQuery,
} from "../../../../graphql/generated";
import { StoreState } from "../../../../store";
import { setChatInputHeight } from "../../../../store/design/designActions";

interface ChatInputProps {}

const inputBackgroundColor = grey[100];

export const ChatInput: React.FC<ChatInputProps> = ({}) => {
  const drawerWidth = useSelector<StoreState>(
    (state) => state.design.drawerWidth
  ) as StoreState["design"]["drawerWidth"];

  const useStyles = makeStyles({
    chatInput: {
      width: `calc(100% - ${drawerWidth} - 2rem - 2rem)`,
      position: "fixed",
      bottom: "1rem",
      zIndex: 100,
    },
    chatInputInner: {
      verticalAlign: "middle",
      background: inputBackgroundColor,
      color: "black",
      "&:hover": {
        background: inputBackgroundColor,
      },
      "&:active": {
        background: inputBackgroundColor,
      },
      "&:focus": {
        background: inputBackgroundColor,
      },
      "&:focus-within": {
        background: inputBackgroundColor,
      },
    },
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const [chatMessage, setChatMessage] = useState("");
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [chatInputPlaceholder, setChatInputPlaceholder] =
    useState("Send a message");

  const { mutateAsync: runCreateChatMutation, isLoading } =
    useCreateChatMutation(graphqlClient);

  const { data: meData } = useMeQuery(graphqlClient);

  const currentRoomId = useSelector<StoreState>(
    (state) => state.room.currentRoomId
  ) as StoreState["room"]["currentRoomId"];

  useEffect(() => {
    if (chatInputRef.current) {
      dispatch(
        setChatInputHeight(chatInputRef.current.getBoundingClientRect().height)
      );
    }
  }, [chatInputRef.current]);

  const onSendButtonClick = async () => {
    if (!chatMessage) {
      setChatInputPlaceholder("Enter a message!!");
      return setTimeout(() => setChatInputPlaceholder("Send a message"), 2000);
    }

    const chatMessageSend = chatMessage;

    setChatMessage("");
    setChatInputPlaceholder("Sending message...");

    await runCreateChatMutation({
      text: chatMessageSend,
      roomId: currentRoomId,
      senderId: meData?.me?.id as string,
    });

    setChatInputPlaceholder("Send a message");
  };

  return (
    <>
      <FilledInput
        className={classes.chatInput}
        classes={{ root: classes.chatInputInner }}
        value={chatMessage}
        ref={chatInputRef}
        placeholder={chatInputPlaceholder}
        onChange={(e) => setChatMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSendButtonClick();
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onSendButtonClick} edge="end">
              <Send />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};
