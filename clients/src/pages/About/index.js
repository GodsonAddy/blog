import React from "react";
import LandingPage from "../LandingPage";
import { Box, Typography, CssBaseline, Container } from "@mui/material";

function About() {
  return (
    <LandingPage>
      <CssBaseline />
      <Box sx={{ my: 10 }}>
        <Container>
          <Typography>ABOUT</Typography>
        </Container>
      </Box>
    </LandingPage>
  );
}

export default About;
