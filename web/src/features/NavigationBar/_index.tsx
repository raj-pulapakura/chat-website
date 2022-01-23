import { Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { brandName } from "../../constants";
import { fonts, colors } from "../../theme";
import { Flex } from "../../components/Flex";
import { Link } from "react-router-dom";
import { routes } from "../AppRouter/_index";
import { Menu, AccountCircle } from "@mui/icons-material";

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
          gap: "0.5rem",
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
        <IconButton>
          <AccountCircle color="secondary" />
        </IconButton>
      </Flex>
    </Paper>
  );
};
