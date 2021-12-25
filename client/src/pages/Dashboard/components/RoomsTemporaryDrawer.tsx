import { Button, Drawer, Typography, IconButton, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RoomsList } from "./RoomsList";
import { makeStyles } from "@mui/styles";
import { Add, Share, ChevronLeft } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store";
import { useMeQuery } from "../../../graphql/generated";
import { graphqlClient } from "../../../graphql/client";
import { grey } from "@mui/material/colors";

interface RoomsTemporaryDrawerProps {
  tempDrawerIsOpen: boolean;
  setTempDrawerIsOpen: (value: boolean) => void;
}

const elementWidth = "min(75%, 300px)";

export const RoomsTemporaryDrawer: React.FC<RoomsTemporaryDrawerProps> = ({
  tempDrawerIsOpen,
  setTempDrawerIsOpen,
}) => {
  const useStyles = makeStyles({
    drawer: {
      width: "100vw",
    },
    drawerPaper: {
      width: "100vw",
      position: "relative",
      padding: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    createRoomButton: {
      width: "100%",
      boxSizing: "border-box",
    },
    joinRoomButton: {
      marginTop: "1rem",
      marginBottom: "2rem",
      width: "100%",
    },
    userBox: {
      background: grey[900],
      position: "absolute",
      bottom: "0",
      width: "100%",
      padding: "1rem",
    },
    closeDrawerIcon: {
      color: grey[700],
    },
    closeDrawerIconButton: {
      position: "absolute",
      bottom: 10,
      right: 10,
    },
    contentBox: {
      width: elementWidth,
    },
  });
  const classes = useStyles();

  const navigate = useNavigate();

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  // };

  return (
    <Drawer
      anchor="left"
      open={tempDrawerIsOpen}
      ModalProps={{
        keepMounted: true,
      }}
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <IconButton
        className={classes.closeDrawerIconButton}
        onClick={() => setTempDrawerIsOpen(false)}
      >
        <ChevronLeft className={classes.closeDrawerIcon} />
      </IconButton>
      <Box className={classes.contentBox}>
        <Button
          variant="contained"
          className={classes.createRoomButton}
          startIcon={<Add />}
          onClick={() => navigate("/create-room/stage-1")}
        >
          CREATE ROOM
        </Button>
        <Button
          variant="contained"
          className={classes.joinRoomButton}
          startIcon={<Share />}
          onClick={() => navigate("/join-room")}
        >
          JOIN ROOM
        </Button>
        <RoomsList paddingBottom="1rem" />
      </Box>

      {/* <Box className={classes.userBox}>
        <Typography color="white">{meData?.me?.name}</Typography>
      </Box> */}
    </Drawer>
  );
};
