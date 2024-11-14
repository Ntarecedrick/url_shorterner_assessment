"use client";

import React, { useEffect, useState } from 'react'
import { useColorScheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material"
function ToggleDarkMode() {
  const [mode, setMode] = useState('light');
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    const colorScheme = window.localStorage.getItem('colorScheme');
    if (colorScheme) {
      setMode(colorScheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('colorScheme', mode);
  }, [mode]);

  const handleModeChange = () => {
    setMode(mode === "dark" ? "light" : "dark");
    setColorScheme(mode === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={handleModeChange}  sx={{
        textTransform: "capitalize",
        backgroundColor: "primary.200",
        borderRadius: "5px",
        padding: "5px 0px",
        transition: "all 0.3s ease-in-out",
        "&.Mui-disabled": {
          backgroundColor: "primary.200",
          color: "primary.main",
          pointerEvents: "auto",
          cursor: "not-allowed",
          
        },
      }}>
     {mode === "dark" ? <DarkModeOutlined  /> : <LightModeOutlined />}
    </Button>
  );
}

export default ToggleDarkMode
