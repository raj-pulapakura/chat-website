import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { useGetRoomByIdQuery } from "../../graphql/generated";
import { graphqlClient } from "../../graphql/client";
import { setCurrentRoomId } from "../../store/room/roomActions";
import { MainContainer } from "../../shared/MainContainer";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface CreateRoomStage2Props {}

const useStyles = makeStyles({
  visitRoomButton: {
    width: "50%",
    marginTop: "1rem",
  },
});

export const CreateRoomStage2Page: React.FC<CreateRoomStage2Props> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const createdRoomId = useSelector<StoreState>(
    (state) => state.room.createdRoomId
  ) as StoreState["room"]["createdRoomId"];

  const { data, isLoading } = useGetRoomByIdQuery(graphqlClient, {
    id: createdRoomId,
  });

  return (
    <MainContainer noBackground>
      {isLoading ? (
        <>
          <Typography>Loading...</Typography>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography textAlign="center">
              Brilliant! Now give your friends the ID below so they can join it
              too!
            </Typography>
            <Typography variant="h4" textAlign="center" fontWeight="bold">
              {data?.roomById?.publicId}
            </Typography>
            <Button
              onClick={() => {
                dispatch(setCurrentRoomId(data?.roomById?.id as string));
                navigate("/");
              }}
              variant="contained"
              className={classes.visitRoomButton}
            >
              VISIT ROOM
            </Button>
          </div>
        </>
      )}
    </MainContainer>
  );
};
