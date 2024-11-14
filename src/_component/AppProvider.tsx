"use client";

import React from "react";
import { Provider } from "react-redux";

import { store } from "@/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useApp } from "@/context/AppContext";
import { Box, Container } from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

function AppProvider({ children }: { children: React.ReactNode }) {
  const theme = createTheme({
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: "#6C63FF",
            "200": "#6C63FF33",
            "100": "#6C63FF1A",
            "500": "#6C63FF",
          },
          secondary: {
            main: "#101214",
          },
        },
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    palette: {
      primary: {
        main: "#6C63FF",
        "200": "#6C63FF33",
        "100": "#6C63FF1A",
        "500": "#6C63FF",
      },
      secondary: {
        main: "#101214",
      },
      error: {
        main: "#FF3333",
        "200": "#FF333333",
      },
    },
  });
  const { isOpen } = useApp();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box
          sx={[
            {
              minHeight: "100vh",
            },
            (theme) => ({
              backgroundColor: theme.palette.background.default,
              ...theme.applyStyles("dark", {
                backgroundColor: theme.palette.secondary.main,
                color:"white"
              }),
            }),
          ]}
        >
          <SideBar />
          <Container
            sx={{ marginLeft: isOpen ? "230px" : "80px", marginTop: "60px" }}
          >
            <NavBar />
            {children}
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default AppProvider;
