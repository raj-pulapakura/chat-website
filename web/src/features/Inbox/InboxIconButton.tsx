import { Inbox } from "@mui/icons-material";
import { IconButton, Popover, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { graphqlClient } from "../../graphql/client";
import { useMeQuery } from "../../graphql/generated";
import { appTheme } from "../../theme";

interface InboxIconButtonProps {}

export const InboxIconButton: React.FC<InboxIconButtonProps> = ({}) => {
  const { data: meData } = useMeQuery(graphqlClient);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = !!anchorEl;

  const userHasInboxItems = !!meData?.me.account?.inviteRequestsReceived.length;

  return (
    <>
      <IconButton onClick={handleClick}>
        <Inbox color="secondary" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            opacity: 1,
            padding: "1rem",
            maxWidth: "350px",
          },
        }}
      >
        {userHasInboxItems ? (
          <Typography>Hello there</Typography>
        ) : (
          <Typography>You have no items in your inbox.</Typography>
        )}
      </Popover>
    </>
  );
};
