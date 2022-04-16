import React from "react";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function LandingFooter() {
  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        backgroundColor: "junior.main",
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
              <Typography variant="h4"> ABOUT US</Typography>
            </Grid>
            <Divider flexItem />

            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
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
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">
                VIBES is a blog page purposely for our everyday activities
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
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
                      color: "#fff",
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
                      color: "#fff",
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
              <Typography variant="body1">LOREM IPSUM</Typography>
              <span>20 JANUARY, 2022</span>
            </Grid>
            <Grid item>
              <Typography variant="body1">LOREM IPSUM</Typography>
              <span>1 FEBRUARY 2022</span>
            </Grid>
            <Grid item>
              <Typography variant="body1">LOREM IPSUM</Typography>
              <span>14 FEBRUARY, 2022</span>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid
            item
            container
            direction="column"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Leave a Comment</Typography>
            </Grid>
            <Divider flexItem />

            <Grid item>
              <TextField
                id="outlined-basic"
                placeholder="Name"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                id="outlined-basic"
                placeholder="Email"
                variant="outlined"
                fullWidth
                sx={{
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                id="outlined-basic"
                placeholder="Comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{
                  backgroundColor: "secondary.main",
                  color: "primary.main",
                }}
              />
            </Grid>

            <br />

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginBottom: "3rem",
                }}
              >
                COMMENT
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