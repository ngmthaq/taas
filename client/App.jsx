import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { routeTree } from "./routeTree";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();
const theme = createTheme({ colorSchemes: { dark: true } });

const App = () => {
  return (
    <ThemeProvider disableTransitionOnChange noSsr theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
