import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setDrawerWidth } from "../store/design/designActions";
import { theme } from "../theme";

interface LogicBoardProps {}

export const LogicBoard: React.FC<LogicBoardProps> = ({ children }) => {
  const dispatch = useDispatch();

  const screenIsBig = useMediaQuery(theme.breakpoints.up("md"));

  if (screenIsBig) {
    dispatch(setDrawerWidth("300px"));
  } else {
    dispatch(setDrawerWidth("0px"));
  }

  return <div>{children}</div>;
};
