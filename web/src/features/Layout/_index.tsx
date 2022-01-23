import React from "react";
import { Box } from "@mui/material";
import { NavigationBar } from "../NavigationBar/_index";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <NavigationBar />
      <Box sx={{ margin: "1rem" }}>{children}</Box>
    </Box>
  );
};
