"use client";

import React from "react";

import { useGetUrlQuery } from "@/api";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/_component/DataTable";
import moment from "moment";
import { Paper, Link, Box, Typography } from "@mui/material";
import ActionPopup from "./ActionPopup";
import { useTranslations, useLocale } from "next-intl";
import { ResponseUrl } from "@/types/urlTypes";


function Table() {
  const { data, isLoading } = useGetUrlQuery();
  const t = useTranslations("HomePage.admin");
  const locale = useLocale();
  const columns: GridColDef<ResponseUrl>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "url",
      headerName: "URL",
      width: 300,
      renderCell: (params) => {
        const isEdited = params.row.createdDate !== params.row.modifiedDate;
        return (
          <Box sx={{ width: "300px", display: "flex", alignItems: "center", gap: 1 }}>
            <Link
              href={params.row.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "500",
                fontFamily: "Roboto",
                maxWidth: isEdited ? "70%" : "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {params.row.url}
            </Link>
            {isEdited && (
              <Typography variant="caption" color="text.secondary">
                ({t("edited")})
              </Typography>
            )}
          </Box>
        )
      },
    },
    {
      field: "ttl",
      headerName: "TTL",
      renderCell: (params) => <>{params.row.ttlInSeconds}</>,
      width: 150,
    },
    {
      field:"shortner",
      headerName: t("shortener"),
      width: 250,
      renderCell: (params) => {
        return (
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_URL}/${params.row.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${process.env.NEXT_PUBLIC_APP_URL}/${params.row.id}`}
          </Link>
        );
      },
    },
    {
      field: "createdDate",
      headerName: t("createdDate"),
      renderCell: (params) => (
        <>{moment(params.row.createdDate).locale(locale).format("DD - MMMM - YYYY,  HH:mm:ss")}</>
      ),
      width: 230,
    },
    {
      field: "modifiedDate",
      headerName: t("updatedDate"),
      renderCell: (params) => (
        <>{moment(params.row.modifiedDate).locale(locale).format("DD - MMMM - YYYY,  HH:mm:ss")}</>
      ),
      width: 230,
    },
    {
      field: "Action",
      headerName: t("action"),
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
            border: 0,
            boxShadow: "none",
            outline: "none",
            ":focus": { outline: "none", backgroundColor: "transparent" },
          }}
        >
          <ActionPopup trigger={t("delete")} id={params.row.id} />
          <ActionPopup
            isEdit={true}
            trigger={t("edit")}
            id={params.row.id}
            url={params.row.url}
            ttlInSeconds={params.row.ttlInSeconds}
          />
        </Box>
      ),
    },
  ];

  return (
    <Paper
      sx={[
        { width: "100%", boxShadow: "none", height: "100Vh" },
        (theme) => ({
          backgroundColor: theme.applyStyles("dark", {
            backgroundColor: "#101214",
            opacity: 1,
            boxShadow: "none",
            borderRadius: "0px",
            backgroundImage: "none",
          }),
        }),
      ]}
    >
      <DataTable columns={columns} data={data || []} isLoading={isLoading} />
    </Paper>
  );
}

export default Table;
