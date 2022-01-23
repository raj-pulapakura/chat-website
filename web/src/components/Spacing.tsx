import { Box } from "@mui/material";
import React from "react";

interface SpacingProps {
  width?: string;
  height?: string;
}

export const Spacing: React.FC<SpacingProps> = ({ width, height }) => {
  return <Box sx={{ width: width || 0, height: height || 0 }}></Box>;
};
