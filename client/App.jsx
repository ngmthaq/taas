import React from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree";

const router = createRouter({ routeTree });

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
