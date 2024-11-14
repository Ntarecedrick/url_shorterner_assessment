"use client";

import { ResponseUrl } from "@/types/urlTypes";
import { Paper, SxProps, Theme } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { useApp } from "@/context/AppContext";
type Props = {
  columns: GridColDef<ResponseUrl>[];
  data: ResponseUrl[];
  isLoading: boolean;
};
function DataTable({ columns, data, isLoading }: Props) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const dataTableStyles: SxProps<Theme> = [
    {
      border: 0,
      outline: 0,
      ":focus": { outline: 0, backgroundColor: "transparent" },
    "& .recently-edited-row": {
        backgroundColor: "#6C63FF1A !important", 
        "&:hover": {
          backgroundColor: "#6C63FF33 !important",
        },
      },
      "& .MuiDataGrid-row:hover": {
        backgroundColor: "primary.200",
        cursor: "pointer",
      },
    },
    (theme) => ({
      backgroundColor: theme.applyStyles("dark", {
        backgroundColor: "#12161d",
        color: "white",
        "& .MuiDataGrid-headers": {
          backgroundColor: "#1c2126",
          color: "white",
        },
      }),
    }),
  ];
  const { recentlyEditedUrls } = useApp();
  const getRowClassName = (params: GridRowParams) => {
    const isRecentlyEdited = recentlyEditedUrls.some(
      (url) => url.id === params.id && url.isEdited
    );
    return isRecentlyEdited ? "recently-edited-row" : "";
  };
  return (
    <Paper
      sx={{
        width: "80Vw",
        height: data.length > 0 ? "auto" : "50Vh",
        maxHeight: "100vh",
        overflowY: "auto",
        mb: 2,
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[25, 50, 75, 100]}
        getRowClassName={getRowClassName}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        disableColumnSelector
        disableDensitySelector
        loading={isLoading}
        sx={dataTableStyles}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          
        }}
        slotProps={{
       
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
      />
    </Paper>
  );
}

export default DataTable;
