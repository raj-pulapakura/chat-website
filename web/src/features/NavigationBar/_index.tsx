import { IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { brandName } from "../../constants";
import { colors } from "../../theme";
import { Flex } from "../../components/Flex";
import { Link } from "react-router-dom";
import { routes } from "../AppRouter/_index";
import { Menu, AccountCircle, Inbox } from "@mui/icons-material";
import { InboxIconButton } from "../Inbox/InboxIconButton";

interface NavigationBarProps {}

export const NavigationBar: React.FC<NavigationBarProps> = ({}) => {
  return (
    <Paper
      sx={{
        borderRadius: "0",
        padding: "0.5rem 1rem",
        backgroundColor: colors.bg,
        color: colors.accent,
      }}
    >
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton>
          <Menu color="secondary" />
        </IconButton>
        <Link
          to={routes.home.path}
          style={{ color: "white", textDecoration: "none" }}
        >
          <Typography variant="h4" fontWeight="700">
            {brandName}
          </Typography>
        </Link>
        <Flex>
          <InboxIconButton />
          <IconButton>
            <AccountCircle color="secondary" />
          </IconButton>
        </Flex>
      </Flex>
    </Paper>
  );
};
