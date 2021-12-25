import { Box, ButtonGroup, Container, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../shared/MainContainer";
import { theme } from "../../theme";

interface NewUserProps {}

export const NewUserPage: React.FC<NewUserProps> = ({}) => {
  const navigate = useNavigate();
  return (
    <MainContainer noBackground>
      <Typography
        variant="h2"
        fontWeight="bold"
        marginBottom="1rem"
        color="primary"
        align="center"
      >
        Welcome to chathub.ninja!
      </Typography>
      <Typography marginBottom="2rem" align="center">
        where you can create or join a room and chat with your mates!
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/register")}
        >
          Sign up
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </ButtonGroup>
    </MainContainer>
  );
};
