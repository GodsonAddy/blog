import React from "react";
import { Box, Grid, Container } from "@mui/material";
import BlogCards2 from "./blogCards2";
import MediaCard from "./mediaCrd";
import ListCards from "./ListCards";
import SubscribeCard from "./subscribeCard";
import LandingPage from "../../../pages/LandingPage";
import CarouselImage from "../BlogCarousel/carouselImage";

function MainPage() {
  return (
    <LandingPage>
      <CarouselImage />
      <Box my={5}>
        <Container>
          <Grid
            container
            display="flex"
            direction="row"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={8}>
              {/* <Grid
            container
            sx={{
              flex: 1,
            }}
            spacing={1}
          > */}
              <BlogCards2 />
              {/* </Grid> */}
            </Grid>

            <Grid item style={{ display: "flex" }} marginTop={2} xs={12} sm={4}>
              <Grid
                container
                display="flex"
                direction="column"
                spacing={2}
                //sx={{ flex: 1 }}
              >
                <Grid item>
                  <MediaCard />
                </Grid>
                <Grid item>
                  <ListCards />
                </Grid>
                <Grid item>
                  <SubscribeCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LandingPage>
  );
}

export default MainPage;
