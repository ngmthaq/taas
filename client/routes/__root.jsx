import React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotFoundComponent } from "../components";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
