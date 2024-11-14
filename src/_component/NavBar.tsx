"use client";
import { useApp } from "@/context/AppContext";
import { Box, Button, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import ToggleDarkMode from "./ToggleDarkMode";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

function NavBar() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const onRouterChange = (locale: "en" | "ger") => {
    if (pathname.includes("/admin")) {
      router.replace(`/${locale}/admin`);
    } else {
      router.replace(`/${locale}`);
    }
  };
  const { toggleSidebar, isOpen } = useApp();
  const buttonStyle = {
    sx: {
      textTransform: "capitalize",
      backgroundColor: "primary.200",
      padding: "0px 0px",
      transition: "all 0.3s ease-in-out",
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      color: "primary.main",
      boxShadow: "none",
      "&.Mui-disabled": {
        backgroundColor: "primary.500",
        color: "white",
        pointerEvents: "auto",
        cursor: "not-allowed",
      },
    },
  };

  return (
    <Box
      sx={[
        {
          position: "fixed",
          top: 0,
          left: isOpen ? 250 : 80,
          zIndex: 1000,
          padding: "10px",
          width: isOpen ? "calc(100vw - 250px)" : "calc(100vw - 80px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        (theme) => ({
          backgroundColor: theme.palette.background.default,
          borderBottom: "1px solid #e0e0e0",
          ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.secondary.main,
            borderBottom: "1px solid #1c2126",
            color: "#fff",
          }),
        }),
      ]}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          onClick={toggleSidebar}
          sx={{
            minWidth: "40px",
            padding: "8px",
          }}
        >
          {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
        <Typography
          sx={{ fontWeight: 500, fontFamily: "Roboto", fontSize: "1.5rem" }}
        >
          {t("title")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            {...buttonStyle}
            onClick={() => onRouterChange("en")}
            disabled={activeLocale === "en"}
          >
            <ReactCountryFlag countryCode="GB" style={{
              fontSize:20
            }} />
            <Typography variant="inherit">En</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            {...buttonStyle}
            onClick={() => onRouterChange("ger")}
            disabled={activeLocale === "ger"}
          >
            <ReactCountryFlag countryCode="DE" style={{
              fontSize:20
            }} />
            <Typography variant="inherit">Ger</Typography>
          </Button>
        </Box>
        <ToggleDarkMode />
      </Box>
    </Box>
  );
}

export default NavBar;
