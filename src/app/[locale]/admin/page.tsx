"use client";

import React from "react";
import Table from "./Table";
import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

function Page() {
  const t = useTranslations("HomePage.admin");
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100vh",
        pb: 4,
        backgroundColor: "transparent",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "500", fontFamily: "Roboto", m: 4, }}
      >
        {t("title")}
      </Typography>
      <Table />
    </Container>
  );
}

export default Page;
