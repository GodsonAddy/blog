import React, { useEffect } from "react";
import {
  Avatar,
  Grid,
  CardActionArea,
  CardActions,
  CardHeader,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { GetAtLeast6Blogs } from "../../../features/actions/blogAction";
import { resetBlog } from "../../../features/reducer/blogReducer";
import { format } from "date-fns";
import Favorite from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

function BlogCards2() {
  const dispatch = useDispatch();
  const { allBlogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(GetAtLeast6Blogs());
    dispatch(resetBlog());
  }, [dispatch]);

  const reduceWords = (str) => {
    return str.length > 300 ? str.substring(0, 220) + "..." : str;
  };

  return (
    <>
      {allBlogs?.length > 0 &&
        allBlogs?.map((blog) => (
          <Grid item key={blog?._id} style={{ display: "flex" }}>
            <Card
              key={blog?._id}
              variant="outlined"
              sx={{
                maxWidth: 345,
                mb: 2,
                pb: 2,
                borderRadius: "16px",
                "&:hover": {
                  backgroundColor: "silver[400]",
                  transform: "scale(1.01)",
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
                    <Typography fontWeight={600}> {blog?.title}</Typography>
                  }
                  subheader={format(new Date(blog?.createdAt), "dd-MMM-yyyy")}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
                  alt="green iguana"
                />
                <CardContent>
                  <Chip
                    label={blog?.category}
                    sx={{
                      bgcolor: blog?.author?.color
                        ? blog?.author?.color
                        : "primary.main",
                      color: "secondary.main",
                    }}
                  />

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
                          <Typography>{blog?.comments?.length}</Typography>
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
        ))}
    </>
  );
}

export default BlogCards2;
