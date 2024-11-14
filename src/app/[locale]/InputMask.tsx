"use client";
import {
  Box,
  Button,
  Card,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import useInputMask from "./useInputMask";
import ProgressLoader from "@/_component/ProgressLoader";
import { Check, ContentCopy, Science } from "@mui/icons-material";

function InputMask() {
  const { methods, handleSubmit, isLoading, copyToClipboard, t, recentlyEditedUrls } =
    useInputMask();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ml: 30,
        mt: 10,
      }}
    >
      <Card
        sx={[
          {
            padding: 4,
            m: 2,
            boxShadow: 3,
            width: "500px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "none",
          },
          (theme) => ({
            backgroundColor: theme.applyStyles("dark", {
              backgroundColor: "#12161d",
              color: "white",
              backgroundImage: "none",
              boxShadow: "none",
            }),
          }),
        ]}
      >
        <FormProvider {...methods}>
          <FormControl
            component="form"
            onSubmit={methods.handleSubmit(handleSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "500", fontFamily: "Roboto" }}
            >
              {t("inputMask.title")}
            </Typography>
            <TextField
              label="URL"
              variant="outlined"
              sx={{
                width: "400px",
             
              }}
              {...methods.register("url")}
            />
            {methods.formState.errors.url && (
              <Typography color="error">
                {methods.formState.errors.url?.message?.toString()}
              </Typography>
            )}
            <TextField
              label={t("inputMask.ttl")}
              variant="outlined"
              type="number"
              sx={{
                width: "400px",
                mt: 2,
                fontSize: "14px",
                height: "35px",
              }}
              {...methods.register("ttlInSeconds", { valueAsNumber: true })}
            />
            {methods.formState.errors.ttlInSeconds && (
              <Typography color="error">
                {methods.formState.errors.ttlInSeconds?.message?.toString()}
              </Typography>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              sx={{
                width: "400px",
                textTransform: "capitalize",
                backgroundColor: "primary.main",
                padding: "10px",
                color: "#fff",
                mt: 2,
                "&[disabled]": {
                  backgroundColor: "primary.200",
                  color: "primary.main",
                },
              }}
            >
              {isLoading ? (
                <ProgressLoader />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Check sx={{ fontSize: 20 }} />
                  <Typography sx={{ fontSize: 14, fontWeight: "500", ml: 1 }}>
                    {t("inputMask.generate")}
                  </Typography>
                </Box>
              )}
            </Button>
          </FormControl>
        </FormProvider>
      </Card>
      <Card
        sx={[
          {
            padding: 4,
            m: 2,
            boxShadow: 3,
            width: "500px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          },
          (theme) => ({
            backgroundColor: theme.applyStyles("dark", {
              backgroundColor: "#12161d",
              color: "white",
              backgroundImage: "none",
              boxShadow: "none",
            }),
          }),
        ]}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "500", fontFamily: "Roboto" }}
        >
          {t("outputMask.title")}
        </Typography>

        <TextField
          label="URL"
          variant="outlined"
          value={
            recentlyEditedUrls.length > 0
              ? recentlyEditedUrls[recentlyEditedUrls.length - 1].shortUrl
              : ""
          }
          sx={{ width: "400px", mt: 2, cursor: "not-allowed" }}
          disabled
        />

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              width: "200px",
              textTransform: "capitalize",
              backgroundColor: "primary.main",
              "&.Mui-disabled": {
                backgroundColor: "primary.200",
                color: "primary.main",
                pointerEvents: "auto",
                cursor: "not-allowed",
              },
            }}
            onClick={copyToClipboard}
            disabled={!recentlyEditedUrls.length}
          >
            <ContentCopy sx={{ fontSize: 20 }} />
            <Typography sx={{ fontSize: 14, fontWeight: "500", ml: 1 }}>
              {t("outputMask.copy")}
            </Typography>
          </Button>
          <Link
            href={
              recentlyEditedUrls.length > 0
                ? recentlyEditedUrls[recentlyEditedUrls.length - 1].shortUrl
                : undefined
            }
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              textAlign: "center",
              width: "200px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "primary.200",
                color: "primary.main",
                fontWeight: "500",
              },
            }}
          >
            <Science sx={{ fontSize: 20 }} />
            <Typography sx={{ fontSize: 14, fontWeight: "500", ml: 1 }}>
              {t("outputMask.test")}
            </Typography>
          </Link>
        </Box>
      </Card>
    </Box>
  );
}

export default InputMask;
