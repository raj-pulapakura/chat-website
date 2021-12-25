import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { graphqlClient } from "../../graphql/client";
import { useMyJoinedRoomsData } from "../../hooks/useMyJoinedRoomsData";
import { useMyCreatedRoomsData } from "../../hooks/useMyCreatedRoomsData";
import { NoRooms } from "./components/NoRooms";
import { RoomsPermanentDrawer } from "./components/RoomsPermanentDrawer";
import { makeStyles } from "@mui/styles";
import { theme } from "../../theme";
import { DashboardAppBar } from "./components/DashboardAppBar";
import { ChatArea } from "./components/ChatArea/ChatArea";
import { RoomsTemporaryDrawer } from "./components/RoomsTemporaryDrawer";

interface DashboardProps {}

const useStyles = makeStyles({
  toolBarSpace: { ...theme.mixins.toolbar, marginTop: "2rem" },
});

export const DashboardPage: React.FC<DashboardProps> = ({}) => {
  const { data: roomsByCreatorData } = useMyCreatedRoomsData();
  const { data: roomsByJoinData } = useMyJoinedRoomsData();

  const screenIsBig = useMediaQuery(theme.breakpoints.up("md"));

  const [tempDrawerIsOpen, setTempDrawerIsOpen] = useState(false);

  const classes = useStyles();
  const userHasRooms =
    (roomsByCreatorData && roomsByCreatorData?.roomsByCreator?.length) ||
    (roomsByJoinData && roomsByJoinData.roomsByJoin.length);

  return (
    <>
      {userHasRooms ? (
        <>
          <DashboardAppBar
            screenIsBig={screenIsBig}
            tempDrawerIsOpen={tempDrawerIsOpen}
            setTempDrawerIsOpen={setTempDrawerIsOpen}
          />
          {screenIsBig ? (
            <RoomsPermanentDrawer />
          ) : (
            <RoomsTemporaryDrawer
              tempDrawerIsOpen={tempDrawerIsOpen}
              setTempDrawerIsOpen={setTempDrawerIsOpen}
            />
          )}
          <div className={classes.toolBarSpace}></div>
          <ChatArea />
        </>
      ) : (
        <NoRooms />
      )}
    </>
  );
};
