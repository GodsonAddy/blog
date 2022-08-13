import React from "react";
import NavigationBar from "../../components/LandingPage/NavigationBar";
import LandingFooter from "../../components/LandingPage/landingfooter";
import { Typography, Container, Grid, Box, CssBaseline } from "@mui/material";

function PageNotFound() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <CssBaseline />
      <NavigationBar />

      <Container>
        <Grid
          container
          display="flex"
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={4}
          marginTop={5}
          marginBottom={12}
        >
          <Grid item>
            <Typography variant="h1">404</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">OOOPS, PAGE NOT FOUND!</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1">
              The page you are looking for either has been moved or doesn't
              exist in the server.Try search again!
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <LandingFooter />
    </Box>
  );
}

export default PageNotFound;
