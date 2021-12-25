import { Button, Drawer, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RoomsList } from "./RoomsList";
import { makeStyles } from "@mui/styles";
import { Add, JoinFull } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store";
import { useMeQuery } from "../../../graphql/generated";
import { graphqlClient } from "../../../graphql/client";
import { grey } from "@mui/material/colors";

interface RoomsPermanentDrawerProps {}

export const RoomsPermanentDrawer: React.FC<RoomsPermanentDrawerProps> =
  ({}) => {
    const drawerWidth = useSelector<StoreState>(
      (state) => state.design.drawerWidth
    ) as StoreState["design"]["drawerWidth"];

    const useStyles = makeStyles({
      drawer: {
        width: drawerWidth,
        overflow: "hidden",
        overflowY: "scroll",
      },
      drawerPaper: {
        width: drawerWidth,
      },
      createRoomButton: {
        margin: "1rem",
      },
      joinRoomButton: {
        margin: "1rem",
        marginTop: "0",
        marginBottom: "2rem",
      },
      userBox: {
        background: grey[900],
        position: "absolute",
        bottom: "0",
        width: "100%",
        padding: "1rem",
      },
    });
    const classes = useStyles();

    const navigate = useNavigate();

    // const { data: meData } = useMeQuery(graphqlClient, {}, {});

    return (
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{ paper: classes.drawer }}
        ModalProps={{
          keepMounted: true,
        }}
      >
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
          startIcon={<JoinFull />}
          onClick={() => navigate("/join-room")}
        >
          JOIN ROOM
        </Button>
        <RoomsList paddingBottom="1rem" />
        {/* <Box className={classes.userBox}>
        <Typography color="white">{meData?.me?.name}</Typography>
      </Box> */}
      </Drawer>
    );
  };
