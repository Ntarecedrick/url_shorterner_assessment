/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNotifications } from "@toolpad/core";
import { useGetUrlQuery, useUpdateUrlMutation } from "@/api";
import { useDeleteUrlMutation } from "@/api";
import { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { UpdateUrl } from "@/types/urlTypes";
import { useTranslations } from "next-intl";
import { useApp } from "@/context/AppContext";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material";

const useActions = ({
  url,
  id,
  ttlInSeconds,
}: {
  url?: string;
  id?: string;
  ttlInSeconds?: number;
}) => {
  const t = useTranslations("HomePage");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteUrl, { isLoading, isSuccess, error, isError }] =
    useDeleteUrlMutation();
  const { refetch } = useGetUrlQuery();
  const handleDelete = (id: string) => {
    deleteUrl({ id });
  };
  const { recentlyEditedUrls, setRecentlyEditedUrls, addRecentUrl } = useApp();
  const notifications = useNotifications();
  useEffect(() => {
    if (isSuccess) {
      notifications.show(t("admin.urlDeleted"), {
        severity: "success",
        autoHideDuration: 3000,
      });
      handleClose();
      refetch();
      const updatedRecentlyEditedUrls = recentlyEditedUrls.filter(
        (url) => url.id !== id
      );
      setRecentlyEditedUrls(updatedRecentlyEditedUrls);
    }
    if (isError) {
      notifications.show(
        ((error as FetchBaseQueryError)?.data as { message: string })
          ?.message || t("admin.somethingWentWrong"),
        {
          severity: "error",
          autoHideDuration: 3000,
        }
      );
    }
  }, [isSuccess, isError]);

  const methods = useForm({
    defaultValues: { url: url || "", ttlInSeconds: ttlInSeconds || 36000 },
  });

  const [
    updateUrl,
    {
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
      data: updatedUrlData,
    },
  ] = useUpdateUrlMutation();
  const handleEdit = (data: FieldValues) => {
    updateUrl({ id: id || "", ...data } as UpdateUrl);
  };
  useEffect(() => {
    if (isSuccessEdit) {
      notifications.show(t("admin.urlUpdated"), {
        severity: "success",
        autoHideDuration: 3000,
      })
      addRecentUrl({
        id: updatedUrlData?.id ?? "",
        url: updatedUrlData?.url ?? "",
        ttlInSeconds: updatedUrlData?.ttlInSeconds,
        shortUrl: `https://urlshortener.smef.io/${updatedUrlData?.id}`,
        isEdited: true,
      });
    ;
      handleClose();
      refetch();
    }
    if (isErrorEdit) {
      notifications.show(t("admin.somethingWentWrong"), {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  }, [isSuccessEdit, isErrorEdit]);

  const tAdmin = useTranslations("HomePage.admin");
  const styles: SxProps<Theme> = [
    {
      boxShadow: "none",
      mt: 1,
    },
    (theme: Theme) => ({
      ...theme.applyStyles("dark", {
        backgroundColor: "transparent",
        color: "white",
        backgroundImage: "none",
        boxShadow: "none",
      }),
    }),
  ];

  const inputStyles: SxProps<Theme> = [
    {
      width: "100%",
      mt: 0.5,
      "& .MuiInputBase-input": {
        padding: " 5px 10px",
      },
    },
    (theme: Theme) => ({
      ...theme.applyStyles("dark", {
        color: "white",
      }),
    }),
  ];
  return {
    open,
    handleOpen,
    handleClose,
    handleDelete,
    isLoading,
    handleEdit,
    isLoadingEdit,
    methods,
    styles,
    inputStyles,
    tAdmin,
  };
};
export default useActions;
