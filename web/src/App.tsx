import React from "react";
import { ThemeProvider } from "@emotion/react";
import { AppRouter } from "./features/AppRouter/_index";
import { appTheme } from "./theme";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={appTheme}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <AppRouter />
        </ReduxProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
