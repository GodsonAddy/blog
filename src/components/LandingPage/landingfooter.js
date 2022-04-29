import React from "react";
import {
  Divider,
  Grid,
  Typography,
  Box,
  IconButton,
  Button
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function LandingFooter() {
  return (
    <Box
      component="footer"
      color="secondary.main"
      bgcolor="tertiary.main"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >

      <Grid container spacing={2} direction="row" justifyContent="space-evenly">
        <Grid item xs={4}>
          <Grid
            container
            direction="column"
            //justifyContent="center"
            //alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography
                variant="h2"
                sx={{
                  mb: 5,
                }}
              >
                vibes
                <sup>&reg;</sup>
              </Typography>
            </Grid>
            <Divider flexItem />



            <Grid item>
              <Typography variant="subtitle1">
                VIBES is a blog page purposely for our everyday activities
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <IconButton
                    sx={{
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#1DA1F2",
                      },
                    }}
                  >
                    <TwitterIcon />
                  </IconButton>
                </Grid>

                <Grid item>
                  <IconButton
                    sx={{
                      color: "secondary.main",
                      "&:hover": {
                        backgroundColor: "#3b5998",
                      },
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                </Grid>

                <Grid item>
                  <IconButton
                    sx={{
                      color: "secondary.main",
                      "&:hover": {
                        backgroundColor: "#8a3ab9",
                      },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* About Us */}
        <Grid item>
          <Grid
            item
            container
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="h4">ABOUT US</Typography>
            </Grid>
            <Grid item xs={4}>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    href="/"
                    sx={{
                      color: "secondary.main",
                      "&:hover": {
                        color: "primary.main",
                      }
                    }}
                  >
                    ABOUT
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    href="/"
                    sx={{
                      color: "secondary.main",
                      "&:hover": {
                        color: "primary.main",
                      }
                    }}
                  >
                    HOME
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    href="/"
                    sx={{
                      color: "secondary.main",
                      "&:hover": {
                        color: "primary.main",
                      }
                    }}
                  >
                    NEWS
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    href="/"
                    sx={{
                      color: "secondary.main",
                      "&:hover": {
                        color: "primary.main",
                      }
                    }}
                  >
                    BLOGS
                  </Button>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Grid>


        {/*Popular Blogs */}
        <Grid item>
          <Grid
            item
            container
            direction="column"
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="h4">POPULAR BLOGS</Typography>
            </Grid>
            <Divider flexItem />
            <Grid item>
              <Button
                href="#text-buttons"
                sx={{
                  color: "secondary.main",
                  "&:hover": {
                    color: "primary.main",
                  }
                }}
              >
                LOREM IPSUM
              </Button>
            </Grid>
            <Grid item>
              <Button
                href="#text-buttons"
                sx={{
                  color: "secondary.main",
                  "&:hover": {
                    color: "primary.main",
                  }
                }}
              >
                LOREM IPSUM
              </Button>
            </Grid>
            <Grid item>
              <Button
                href="#text-buttons"
                sx={{
                  color: "secondary.main",
                  "&:hover": {
                    color: "primary.main",
                  }
                }}
              >
                LOREM IPSUM
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider color="#ffffff" flexItem />

      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={5}
      >
        <Grid item>
          <Copyright />
        </Grid>
      </Grid>
    </Box>
  );
}


function Copyright() {
  return (
    <Typography variant="body2" color="secondary.main">
      {'Copyright © CLOCKWORK INC '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}