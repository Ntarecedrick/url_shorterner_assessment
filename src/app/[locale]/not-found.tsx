import { Container, Typography } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <Container
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color:"red"
      }}
    >
      <Typography variant="h1">Not Found</Typography>
    </Container>
  );
}

export default NotFound;
