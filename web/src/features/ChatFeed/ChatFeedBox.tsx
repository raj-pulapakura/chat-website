import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { Spacing } from "../../components/Spacing";
import { graphqlClient } from "../../graphql/client";
import { useMeQuery } from "../../graphql/generated";

interface ChatFeedBoxProps {
  chat: {
    __typename?: "ChatGraphql";
    id: string;
    createdAt: string;
    updatedAt: string;
    text: string;
    senderId: string;
    roomId: string;
  };
}

export const ChatFeedBox: React.FC<ChatFeedBoxProps> = ({ chat }) => {
  const { data: meData } = useMeQuery(graphqlClient);

  const chatWasSentByMe = meData?.me.account?.id === chat.senderId;

  return (
    <>
      <PrimeWrapper>
        <Typography fontWeight="bold">
          {chatWasSentByMe ? meData.me.account?.username : "Some other guy"}
        </Typography>
        <Typography fontSize="17.5px">{chat.text}</Typography>
      </PrimeWrapper>
      <Spacing height="1rem" />
    </>
  );
};
