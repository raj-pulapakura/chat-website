import { Typography, Button, ButtonGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../shared/MainContainer";

interface NoRoomsProps {}

const useStyles = makeStyles({
  buttonGroup: {
    marginTop: "2rem",
  },
});

export const NoRooms: React.FC<NoRoomsProps> = ({}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <MainContainer noBackground>
      <Typography textAlign="center">
        You currently have no rooms. You can either create a new room and invite
        your friends over, or you can join an existing room with an id
      </Typography>
      <ButtonGroup fullWidth className={classes.buttonGroup}>
        <Button
          variant="contained"
          onClick={() => navigate("/create-room/stage-1")}
        >
          CREATE A ROOM
        </Button>
        <Button variant="outlined" onClick={() => navigate("/join-room")}>
          JOIN A ROOM
        </Button>
      </ButtonGroup>
    </MainContainer>
  );
};
