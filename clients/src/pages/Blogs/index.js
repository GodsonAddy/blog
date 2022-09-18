import React, { useEffect } from "react";
import {
  Box,
  Container,
  Avatar,
  Grid,
  CardActionArea,
  CardActions,
  CardHeader,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Paper,
} from "@mui/material";
import { getAllBlogs } from "../../features/actions/blogAction";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import Favorite from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import LandingPage from "../LandingPage";
import { Paginate } from "./util";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AllBlogs() {
  const query = useQuery();
  const page = query.get("page") || 1;

  const dispatch = useDispatch();
  const { allBlogs, loader } = useSelector((state) => state.blog);

  useEffect(() => {
    if (page && allBlogs) {
      dispatch(getAllBlogs(page));
    }
  }, [allBlogs, dispatch, page]);

  const reduceWords = (str) => {
    return str.length > 300 ? str.substring(0, 220) + "..." : str;
  };

  return (
    <LandingPage>
      <Box my={10}>
        <Container>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            flexDirection="column"
          >
            {!allBlogs?.length && !loader && (
              <Typography>No Blogs...</Typography>
            )}
            {loader ? (
              <CircularProgress />
            ) : (
              <Grid item>
                <Grid
                  container
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  flexDirection="column"
                >
                  {allBlogs?.map((blog) => (
                    <Box key={blog?._id}>
                      <Grid item style={{ display: "flex" }}>
                        <Card
                          key={blog?._id}
                          variant="outlined"
                          sx={{
                            maxWidth: 345,
                            mb: 2,
                            pb: 2,
                            borderRadius: "16px",
                            transition: "0.2s",
                            "&:hover": {
                              backgroundColor: "silver[400]",
                              transform: "scale(1.1)",
                              boxShadow: "1px 1px 30px silver",
                            },
                          }}
                        >
                          <CardActionArea
                            LinkComponent={Link}
                            to={`/blog/${blog.category}/${blog._id}/${blog.slug}`}
                          >
                            <CardHeader
                              avatar={
                                blog?.author?.avatar ? (
                                  <Avatar
                                    alt={blog?.author?.name}
                                    src={blog?.author?.avatar}
                                  />
                                ) : (
                                  <Avatar
                                    alt={blog?.author?.name}
                                    sx={{
                                      bgcolor: blog?.author?.color,
                                    }}
                                  >
                                    {blog?.author?.initials}
                                  </Avatar>
                                )
                              }
                              title={
                                <Typography fontWeight={600}>
                                  {" "}
                                  {blog?.title}
                                </Typography>
                              }
                              subheader={format(
                                new Date(blog?.createdAt),
                                "dd-MMM-yyyy"
                              )}
                            />
                            <CardMedia
                              component="img"
                              height="140"
                              image="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {blog?.category}
                              </Typography>

                              <Typography variant="body2" color="text.primary">
                                {reduceWords(blog?.content)}
                              </Typography>
                            </CardContent>

                            <CardActions>
                              <Grid
                                container
                                display="flex"
                                spacing={2}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Grid container display="flex" spacing={2}>
                                    <Grid item>
                                      <ModeCommentIcon />
                                    </Grid>
                                    <Grid item>
                                      <Typography>
                                        {blog?.comments?.length}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item>
                                  <Grid container display="flex" spacing={2}>
                                    <Grid item>
                                      <Favorite
                                        sx={{
                                          color: "#E60000",
                                        }}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Typography>{blog?.favorites}</Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item>
                                  <Grid container display="flex" spacing={2}>
                                    <Grid item>
                                      <VisibilityIcon />
                                    </Grid>
                                    <Grid item>
                                      <Typography>100</Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardActions>
                          </CardActionArea>
                        </Card>
                      </Grid>
                      <Grid item mt={10}>
                        <Paper sx={{ p: 2 }}>
                          <Paginate page={page} />
                        </Paper>
                      </Grid>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </LandingPage>
  );
}

export default AllBlogs;
