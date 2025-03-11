import React from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import { routeTree } from "./routeTree";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createRouter({ routeTree });
const queryClient = new QueryClient();
const theme = createTheme({ colorSchemes: { dark: true } });

const App = () => {
  const { i18n } = useTranslation();
  const themeWithLocale = createTheme(theme, locales[i18n.language]);

  return (
    <ThemeProvider disableTransitionOnChange noSsr theme={themeWithLocale}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
