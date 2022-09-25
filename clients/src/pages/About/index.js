import React from "react";
import LandingPage from "../LandingPage";
import { Box, Typography, CssBaseline, Container } from "@mui/material";

function About() {
  return (
    <LandingPage>
      <CssBaseline />
      <Container>
        <Box sx={{ my: 10 }}>
          <Typography>About</Typography>
        </Box>
      </Container>
    </LandingPage>
  );
}

export default About;
