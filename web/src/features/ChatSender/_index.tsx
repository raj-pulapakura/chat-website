import { Send } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { graphqlClient } from "../../graphql/client";
import { useCreateChatMutation, useMeQuery } from "../../graphql/generated";
import { designSlice, StoreState } from "../../store";

interface ChatSenderProps {}

export const ChatSender: React.FC<ChatSenderProps> = ({}) => {
  const dispatch = useDispatch();

  const currentRoomId = useSelector<StoreState>(
    (state) => state.room.currentRoomId
  ) as StoreState["room"]["currentRoomId"];

  const [message, setMessage] = React.useState("");
  const chatSenderRef = React.useRef<HTMLDivElement>(null);

  const { mutateAsync: createChat } = useCreateChatMutation(graphqlClient);
  const { data: meData } = useMeQuery(graphqlClient);

  React.useEffect(() => {
    const chatSender = chatSenderRef.current;
    if (chatSender) {
      dispatch(
        designSlice.actions.setChatSenderHeight(
          chatSender.getBoundingClientRect().height
        )
      );
    }
  }, [chatSenderRef]);

  const sendMessage = async () => {
    if (!message) return;
    if (!meData?.me.account) return;

    await createChat({
      input: {
        text: message,
        senderId: meData.me.account.id,
        roomId: currentRoomId,
      },
    });

    setMessage("");
  };

  return (
    <Box
      ref={chatSenderRef}
      sx={{ position: "fixed", width: "100%", bottom: 0, left: 0 }}
    >
      <OutlinedInput
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        placeholder="Send a message..."
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={sendMessage}>
              <Send color="secondary" />
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
};
