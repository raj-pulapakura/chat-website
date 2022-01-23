import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimeWrapper } from "../../components/PrimeWrapper";
import { MeQuery } from "../../graphql/generated";

interface RoomListItemProps {
  room: {
    __typename?: "RoomGraphql";
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    description?: string | null | undefined;
    creatorId: string;
    chats: Array<{
      __typename?: "ChatGraphql";
      id: string;
      createdAt: string;
      updatedAt: string;
      text: string;
      senderId: string;
      roomId: string;
    }>;
  };
}

export const RoomListItem: React.FC<RoomListItemProps> = ({ room }) => {
  const navigate = useNavigate();
  return (
    <PrimeWrapper
      sx={{
        transition: "all 250ms ease-out",
        ":hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(`/rooms/${room.id}`)}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {room.title}
      </Typography>
      <Typography>{room.description}</Typography>
    </PrimeWrapper>
  );
};
