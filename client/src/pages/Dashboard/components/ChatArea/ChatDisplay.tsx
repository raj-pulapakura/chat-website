import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { graphqlClient } from "../../../../graphql/client";
import {
  useMeQuery,
  UserByIdDocument,
  UserByIdQuery,
  UserByIdQueryVariables,
  useUserByIdQuery,
} from "../../../../graphql/generated";
import { useCurrentRoomChatData } from "../../../../hooks/useCurrentRoomChatData";
import { theme } from "../../../../theme";
import { StoreState } from "../../../../store";
import { useQueries } from "react-query";

interface ChatDisplayProps {}

export const ChatDisplay: React.FC<ChatDisplayProps> = ({}) => {
  const chatInputHeight = useSelector<StoreState>(
    (state) => state.design.chatInputHeight
  ) as StoreState["design"]["chatInputHeight"];

  const useStyles = makeStyles({
    chatDisplay: {
      display: "flex",
      flexDirection: "column",
      height: `calc(100% - ${chatInputHeight}px - 40px)`,
      gap: "1rem",
      zIndex: "50",
      overflow: "hidden",
      overflowY: "scroll",
      scrollBehavior: "smooth",
      width: "100%",
      // background: "red",
    },
    chatSingleBox: {
      padding: "1rem",
      borderRadius: "0.5rem",
      backgroundColor: grey[800],
    },
    chatSingleBoxMe: {},
    chatSingleBoxOther: {},
  });

  const classes = useStyles();

  const { data: meData } = useMeQuery(graphqlClient);
  const { data: chatData } = useCurrentRoomChatData();

  const fetchUserById = async (userId: string) => {
    const response = await graphqlClient.request<
      UserByIdQuery,
      UserByIdQueryVariables
    >(UserByIdDocument, { id: userId });

    return response;
  };

  const chatUsersQueries = useQueries(
    chatData
      ? chatData?.chatsByRoom.map((chat) => {
          return {
            queryKey: ["user", chat.senderId],
            queryFn: () => fetchUserById(chat.senderId),
          };
        })
      : []
  );

  const chatDisplayRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const container = chatDisplayRef.current;
  //   if (container) {
  //     container.style.height = `${
  //       container.getBoundingClientRect().height - chatInputHeight - 20
  //     }px`;
  //   }
  // }, []);

  useEffect(() => {
    const container = chatDisplayRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatDisplayRef.current, chatData?.chatsByRoom]);

  return (
    <Box className={classes.chatDisplay} ref={chatDisplayRef}>
      {chatData?.chatsByRoom.map((chat) => {
        return (
          <div key={chat.id} style={{ marginRight: "1rem" }}>
            {meData?.me?.id === chat.senderId ? (
              <Box
                className={`${classes.chatSingleBox} ${classes.chatSingleBoxMe}`}
              >
                <Typography variant="caption" color="white" fontWeight="bold">
                  You said
                </Typography>
                <Typography color="white">{chat.text}</Typography>
              </Box>
            ) : (
              <Box
                className={`${classes.chatSingleBox} ${classes.chatSingleBoxOther}`}
              >
                <Typography variant="caption" color="white">
                  {chatUsersQueries.find(
                    (chatUserQuery) =>
                      chatUserQuery.data?.userById?.id === chat.senderId
                  )?.data?.userById?.name || "Loading..."}
                </Typography>
                <Typography color="white">{chat.text}</Typography>
              </Box>
            )}
          </div>
        );
      })}
    </Box>
  );
};
