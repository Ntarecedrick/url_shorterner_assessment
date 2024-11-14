/* eslint-disable react-hooks/exhaustive-deps */
import { useCreateUrlMutation } from "@/api";
import { CreateUrl } from "@/types/urlTypes";
import { useForm, FieldValues } from "react-hook-form";
import useGetAllUrl from "../../hooks/useGetAllUrl";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useTranslations } from "next-intl";
import { useApp } from "@/context/AppContext";

const useInputMask = () => {
  const t = useTranslations("HomePage");

  const schema = z.object({
    url: z
      .string()
      .refine((value) => value !== "", { message: t("error.urlRequired") })
      .refine(
        (value) =>
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)(\?\S+)?\/?$/.test(
            value
          ),
        { message: t("error.url") }
      ),
    ttlInSeconds: z
      .number(
        {
          required_error: t("error.ttlRequired"),
          invalid_type_error: t("error.ttlRequired"),
        }
      )
      .min(0, { message: t("error.ttlGreaterThan0") })
      .refine((value) => value !== undefined, {
        message: t("error.ttlRequired"),
      })
      .optional(),
  });
  const methods = useForm({ resolver: zodResolver(schema) });
  const [createUrl, { isLoading, isSuccess, isError, error, data }] =
    useCreateUrlMutation();
  const { refetch } = useGetAllUrl();
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: FieldValues) => {

    createUrl(data as CreateUrl) 
  };
  const notifications = useNotifications();
  const { recentlyEditedUrls, addRecentUrl } = useApp();

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
      notifications.show(t("toast.postedSuccess"), {
        severity: "success",
        autoHideDuration: 3000,
      });
      addRecentUrl({
        id: data?.id,
        url: data?.url,
        ttlInSeconds: data?.ttlInSeconds,
        shortUrl: `https://urlshortener.smef.io/${data?.id}`,
        isEdited: false,
      });
      refetch();
    }
    if (isError) {
      notifications.show(t("toast.errorAdding"), {
        severity: "error",
        autoHideDuration: 3000,
      });
      console.log(error);
    }
  }, [isSuccess, isError]);

  
  const copyToClipboard = () => {
    if (recentlyEditedUrls.length > 0) {
      notifications.show(t("toast.copy"), {
        severity: "success",
        autoHideDuration: 3000,
      });
      navigator.clipboard.writeText(recentlyEditedUrls[recentlyEditedUrls.length - 1].shortUrl);
    }else{
      notifications.show(t("toast.errorCopy"), {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };
  return {
    methods,
    handleSubmit,
    isLoading,
    open,
    setOpen,
    data,
    copyToClipboard,
    t,
    recentlyEditedUrls,
  };
};

export default useInputMask;
