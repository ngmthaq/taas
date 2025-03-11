import React from "react";
import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return <div>{t("welcome")}</div>;
}
