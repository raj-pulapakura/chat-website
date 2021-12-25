import { Box, BoxProps, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoomId } from "../../../store/room/roomActions";
import { StoreState } from "../../../store";
import { theme } from "../../../theme";
import { useMyRoomsData } from "../../../hooks/useMyRoomsData";
import { grey } from "@mui/material/colors";

type RoomListProps = {} & BoxProps;

export const RoomsList: React.FC<RoomListProps> = ({ ...props }) => {
  const useStyles = makeStyles({
    subListBox: {
      margin: "1rem",
      marginBottom: "0",
      padding: "0.5rem",
      borderRadius: "1rem",
      transition: "all 250ms ease-in-out",
      "&:hover": {
        borderRadius: "0.5rem",
        cursor: "pointer",
      },
    },
  });
  const classes = useStyles();

  const dispatch = useDispatch();

  const currentRoomId = useSelector<StoreState>(
    (state) => state.room.currentRoomId
  ) as StoreState["room"]["currentRoomId"];

  const { data: roomsData } = useMyRoomsData();

  useEffect(() => {
    if (!currentRoomId && roomsData?.roomsByUser[0]) {
      dispatch(setCurrentRoomId(roomsData.roomsByUser[0].id));
    }
  });

  return (
    <Box {...props}>
      <Typography variant="h5" align="center" fontWeight="bold">
        Your Rooms
      </Typography>
      {roomsData?.roomsByUser.map((room) => {
        return (
          <div key={room.id}>
            <Box
              bgcolor={
                room.id === currentRoomId
                  ? theme.palette.primary.main
                  : grey[900]
              }
              className={classes.subListBox}
              onClick={() => dispatch(setCurrentRoomId(room.id))}
            >
              <Typography variant="subtitle1" align="center" color="white">
                {room.name}
              </Typography>
            </Box>
          </div>
        );
      })}
    </Box>
  );
};
