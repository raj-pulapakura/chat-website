import { createTheme } from "@mui/material";

export const colors = {
  bg: "#1D1D1D", // dark black
  primary: "#272727", // light black
  secondary: "#FFFFFF", // white
  accent: "#B1FFFF", // electric blue
};

export const fonts = {
  brand: "Bebas Neue",
  primary: "Work Sans",
};

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: colors.bg,
      paper: colors.primary,
    },
    text: {
      primary: colors.secondary,
      secondary: colors.primary,
    },
    primary: {
      main: colors.primary,
      contrastText: colors.secondary,
    },
    secondary: {
      main: colors.accent,
      contrastText: colors.bg,
    },
  },
  typography: {
    fontFamily: fonts.primary,
    button: {
      fontFamily: fonts.primary,
      fontWeight: 700,
    },
  },
});
