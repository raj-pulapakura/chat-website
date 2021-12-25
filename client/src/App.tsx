import React from "react";
import { Router } from "./Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import { store } from "./store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "./App.css";
import { setDrawerWidth } from "./store/design/designActions";
import { LogicBoard } from "./shared/LogicBoard";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LogicBoard>
            <Router />
          </LogicBoard>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
export default App;
