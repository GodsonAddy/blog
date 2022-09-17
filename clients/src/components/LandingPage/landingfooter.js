import React, { useEffect } from "react";
import {
  Divider,
  Grid,
  Typography,
  Box,
  IconButton,
  Container,
  Link,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useSelector, useDispatch } from "react-redux";
import { GetAtLeast3Blogs } from "../../features/actions/blogAction";
import "../../App.css";

const routes = [
  {
    name: "HOME",
    link: "/",
  },
  {
    name: "ABOUT",
    link: "/about",
  },
  {
    name: "NEWS",
    link: "/news",
  },
  {
    name: "BLOGS",
    link: "/blog",
  },
];

export default function LandingFooter() {
  const { allBlogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAtLeast3Blogs());
  }, [dispatch]);

  const reduceTitle = (str) => {
    return str.length > 35 ? str.substring(0, 35) + "..." : str;
  };

  return (
    <Box component="footer" bgcolor="#e0e0e0" color="tertiary" pt={2} mt={5}>
      <Container>
        <Grid container spacing={2} display="flex">
          <Grid item xs={12} sm={4}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  sx={{
                    letterSpacing: 5,
                    backgroundColor: "tertiary.main",
                    color: "secondary.main",
                  }}
                  id="logo"
                >
                  <sup style={{ fontSize: "14px" }}>THE</sup>BLOGMENTARY
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Social */}

          <Grid item xs={12} sm={2}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Typography variant="h6" fontWeight={700}>
                  SOCIAL
                </Typography>
              </Grid>

              <Grid item>
                <IconButton
                  sx={{
                    color: "secondary.main",
                    backgroundColor: "tertiary.main",
                    "&:hover": {
                      backgroundColor: "#1DA1F2",
                    },
                  }}
                  href="https://www.twitter.com/godsonaddy"
                  target="_blank"
                >
                  <TwitterIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton
                  sx={{
                    color: "secondary.main",
                    backgroundColor: "tertiary.main",
                    "&:hover": {
                      backgroundColor: "#0072b1",
                    },
                  }}
                  href="https://www.linkedin.com/in/godson-addy/"
                  target="_blank"
                >
                  <LinkedInIcon />
                </IconButton>
              </Grid>

              <Grid item>
                <IconButton
                  sx={{
                    color: "secondary.main",
                    backgroundColor: "tertiary.main",
                    "&:hover": {
                      backgroundColor: "#171515",
                    },
                  }}
                  href="https://www.github.com/GodsonAddy/blog"
                  target="_blank"
                >
                  <GitHubIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          {/* About Us */}
          <Grid item xs={12} sm={3}>
            <Grid
              container
              display="flex"
              direction="column"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6" fontWeight={700}>
                  ABOUT US
                </Typography>
              </Grid>

              <Grid item>
                <Grid
                  container
                  display="flex"
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  {routes.map(({ name, link }) => (
                    <Grid item key={name}>
                      <Link
                        href={link}
                        sx={{
                          color: "tertiary.main",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                        underline="hover"
                      >
                        {name}
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*Popular Blogs */}
          <Grid item xs={12} sm={3}>
            <Grid
              container
              direction="column"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h6" fontWeight={700}>
                  POPULAR BLOGS
                </Typography>
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  {allBlogs?.length > 0 &&
                    allBlogs?.map((blog) => (
                      <Grid item key={blog?._id}>
                        <Link
                          href={`/blog/${blog.category}/${blog._id}/${blog.slug}`}
                          sx={{
                            color: "tertiary.main",
                            "&:hover": {
                              color: "primary.main",
                            },
                          }}
                          underline="hover"
                        >
                          {reduceTitle(blog?.title)}
                        </Link>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ color: "tertiary.main", mt: 4 }} flexItem />

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
      </Container>
    </Box>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="tertiary">
      {"Copyright © CLOCKWORK INC "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
