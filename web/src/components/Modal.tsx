import React from "react";
import { Backdrop } from "./Backdrop";
import { Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { appTheme } from "../theme";

interface ModalProps {
  onClose: () => void;
  noCrossIcon?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  noCrossIcon,
}) => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <Box
        sx={{
          position: "fixed",
          width: "max(350px, 50vw)",
          top: "10%",
          left: "50%",
          maxHeight: "50vh",
          overflow: "auto",
          transform: "translateX(-50%)",
          background: appTheme.palette.primary.main,
          color: "white",
          zIndex: 10,
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        {!noCrossIcon && (
          <Box sx={{ position: "absolute", top: 10, right: 10 }}>
            <IconButton onClick={onClose}>
              <Close htmlColor="white" />
            </IconButton>
          </Box>
        )}
        {children}
      </Box>
    </>
  );
};
