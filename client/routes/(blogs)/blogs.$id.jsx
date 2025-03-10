import React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(blogs)/blogs/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(blogs)/blogs/$id"!</div>;
}
