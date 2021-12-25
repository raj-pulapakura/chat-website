import {
  Typography,
  TextField,
  Button,
  BaseTextFieldProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { MainContainer } from "./MainContainer";
import { red } from "@mui/material/colors";

interface MainFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: Array<{
    label: string;
    type?: string;
    value: BaseTextFieldProps["value"];
    error?: string | null;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  }>;
  title: string;
  button: string;
}

const useStyles = makeStyles({
  fieldWithError: {},
  fieldWithoutError: {
    marginBottom: "2rem",
  },
  errorText: {
    marginBottom: "2rem",
    marginTop: "0.5rem",
  },
});

export const MainForm: React.FC<MainFormProps> = ({
  onSubmit,
  fields,
  title,
  button,
  children,
}) => {
  const classes = useStyles();
  return (
    <MainContainer noBackground>
      <form onSubmit={onSubmit}>
        <Typography
          variant="h2"
          fontWeight="bold"
          color="primary"
          marginBottom="2rem"
        >
          {title}
        </Typography>
        {fields.map((field) => (
          <div key={field.label}>
            <TextField
              className={
                field.error ? classes.fieldWithError : classes.fieldWithoutError
              }
              label={field.label}
              type={field.type || "text"}
              variant="outlined"
              fullWidth
              required
              value={field.value}
              onChange={field.onChange}
            />
            {field.error && (
              <Typography color={red[300]} className={classes.errorText}>
                {field.error}
              </Typography>
            )}
          </div>
        ))}

        <Button type="submit" variant="contained">
          {button}
        </Button>
        {children}
      </form>
    </MainContainer>
  );
};
