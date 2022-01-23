import { TextField, Box, Typography } from "@mui/material";
import React from "react";
import { appTheme } from "../../theme";
import { Spacing } from "../Spacing";

interface SimpleFormControlProps {
  label: string;
  type?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  error: string;
  required?: boolean;
}

export const SimpleFormControl: React.FC<SimpleFormControlProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  required = true,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        required={required}
        label={label}
        value={value}
        variant="filled"
        error={!!error}
        color="secondary"
        onChange={onChange}
        type={type || "text"}
        sx={{ width: "100%" }}
        InputLabelProps={{ style: { color: "white" } }}
      />
      <Spacing height="0.5rem" />
      <Box>
        <Typography
          textAlign="left"
          color={appTheme.palette.error.light}
          variant="subtitle1"
        >
          {error}
        </Typography>
      </Box>
      <Spacing height="1rem" />
    </Box>
  );
};
