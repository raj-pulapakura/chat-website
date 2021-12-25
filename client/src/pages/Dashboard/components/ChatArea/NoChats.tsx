import { Typography } from "@mui/material";
import React from "react";
import { MainContainer } from "../../../../shared/MainContainer";

interface NoChatsProps {}

export const NoChats: React.FC<NoChatsProps> = ({}) => {
  return (
    <MainContainer noBackground textCentered>
      <Typography color="primary">
        Send the first message and ignite the conversation! 😀
      </Typography>
    </MainContainer>
  );
};
