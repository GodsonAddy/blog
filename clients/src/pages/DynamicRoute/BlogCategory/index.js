import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { getBlogByCategory } from "../../../features/actions/blogAction";
import {
  Grid,
  Card,
  CardActions,
  CardActionArea,
  CardHeader,
  CardMedia,
  Typography,
  CardContent,
  Avatar,
  Box,
  Container,
  CircularProgress,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LandingPage from "../../LandingPage";
import Favorite from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { NotFound, Paginate } from "./util";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const BlogCategory = () => {
  const { blogCategory, loader } = useSelector((state) => state.blog);

  const params = useParams();
  const query = useQuery();
  const { category } = params;
  const page = query.get("page") || 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (page && blogCategory) {
      dispatch(getBlogByCategory({ category }, page));
    }
  }, [category, dispatch, page]);

  const reduceWords = (str) => {
    return str.length > 300 ? str.substring(0, 220) + "..." : str;
  };

  if (!blogCategory?.length && !loader) {
    return (
      <LandingPage>
        <NotFound />
      </LandingPage>
    );
  }
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
                  {blogCategory?.map((blog) => (
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
};

export default BlogCategory;
