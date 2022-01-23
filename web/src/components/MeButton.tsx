import { Button } from "@mui/material";
import React from "react";
import { graphqlClient } from "../graphql/client";
import { useMeQuery } from "../graphql/generated";

interface MeButtonProps {}

export const MeButton: React.FC<MeButtonProps> = ({}) => {
  const { refetch: getMeData } = useMeQuery(graphqlClient);

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      onClick={async () => {
        const response = await getMeData();
        console.log(response.data);
      }}
    >
      Log Me Data
    </Button>
  );
};
