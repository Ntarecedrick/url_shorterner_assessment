import { Container, Typography } from '@mui/material'
import React from 'react'

function NotFound() {
  return (
    <Container
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 900,
        flexDirection: "column",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h1">Not Found</Typography>
    </Container>
  );
}

export default NotFound
