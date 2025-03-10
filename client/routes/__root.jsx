import React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "../components";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return <Outlet />;
}
