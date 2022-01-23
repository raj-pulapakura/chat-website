import { Button } from "@mui/material";
import React from "react";
import { graphqlClient } from "../graphql/client";
import { useLogoutMutation } from "../graphql/generated";

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = ({}) => {
  const { mutateAsync: logout } = useLogoutMutation(graphqlClient);
  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      onClick={async () => {
        const data = await logout({});
        console.log(data.logout);
      }}
    >
      Logout
    </Button>
  );
};
