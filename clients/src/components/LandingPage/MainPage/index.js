import React from "react";
import { Box, Grid, Container, Typography, Button } from "@mui/material";
import BlogCards2 from "./blogCards2";
import MediaCard from "./mediaCrd";
import ListCards from "./ListCards";
import SubscribeCard from "./subscribeCard";
import LandingPage from "../../../pages/LandingPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.css";

function MainPage() {
  const { jwtToken } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const GetStarted = () => {
    if (jwtToken) {
      navigate("/myaccount/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <LandingPage>
      <Box
        className="hero"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "secondary.main",
        }}
      >
        <Container>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Grid
                container
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h3" fontWeight={700} mb={2}>
                    You are what you blog
                  </Typography>
                  <Typography variant="body1" fontWeight={700} mb={2}>
                    We are constantly uncovering new habits in our blogging
                    intelligence to teach us more about how people blog ~ we
                    call it Understanding People through Blogging.Think you know
                    what kind of blogger you are? Login to BLOGMENTARY to see
                    your own blogging in action.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ fontWeight: 700 }}
                    onClick={GetStarted}
                  >
                    {" "}
                    GET STARTED
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
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
