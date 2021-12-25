import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useCurrentRoomData } from "../../../hooks/useCurrentRoomData";
import { CopyAll, Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store";
import { theme } from "../../../theme";
import { grey } from "@mui/material/colors";

interface DashboardAppBarProps {
  tempDrawerIsOpen: boolean;
  setTempDrawerIsOpen: (value: boolean) => void;
  screenIsBig: boolean;
}

export const DashboardAppBar: React.FC<DashboardAppBarProps> = ({
  tempDrawerIsOpen,
  setTempDrawerIsOpen,
  screenIsBig,
}) => {
  const drawerWidth = useSelector<StoreState>(
    (state) => state.design.drawerWidth
  ) as StoreState["design"]["drawerWidth"];

  const useStyles = makeStyles({
    appBar: {
      width: `calc(100% - ${drawerWidth})`,
      padding: "0.5rem",
    },
    appBarTitle: {
      flexGrow: 1,
    },
    appBarButton: {
      color: "white",
    },
    menuIconButton: {
      marginRight: "1rem",
    },
    menuIcon: {
      color: "white",
    },
    copyButton: {
      background: "white",
      color: theme.palette.primary.main,
      "&:hover": {
        background: grey[100],
      },
    },
  });
  const classes = useStyles();

  const { data, isLoading } = useCurrentRoomData();
  const [copied, setCopied] = useState(false);

  const onCopyButtonClicked = () => {
    navigator.clipboard.writeText(data?.roomById?.publicId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        {!screenIsBig && (
          <IconButton
            className={classes.menuIconButton}
            onClick={() => setTempDrawerIsOpen(!tempDrawerIsOpen)}
          >
            <Menu className={classes.menuIcon} />
          </IconButton>
        )}
        <Typography
          className={classes.appBarTitle}
          variant="h4"
          fontWeight="bold"
        >
          {isLoading ? "Loading..." : data?.roomById?.name}
        </Typography>
        <Button
          className={classes.copyButton}
          onClick={() => onCopyButtonClicked()}
          variant="contained"
        >
          {copied ? "Copied!" : "Copy Room ID"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
