import { Paper, PaperProps } from "@mui/material";
import React from "react";
import { appTheme } from "../theme";

type PrimeWrapperProps = {
  responsive?: boolean;
} & PaperProps;

export const PrimeWrapper: React.FC<PrimeWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <Paper
      {...props}
      sx={{
        padding: "1rem",
        ...props.sx,
      }}
    >
      {children}
    </Paper>
  );
};
