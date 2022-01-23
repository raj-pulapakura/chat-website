import { Box, BoxProps } from "@mui/material";
import React from "react";

type FlexProps = {} & BoxProps;

export const Flex: React.FC<FlexProps> = ({ ...props }) => {
  return <Box {...props} sx={{ ...props.sx, display: "flex" }}></Box>;
};
