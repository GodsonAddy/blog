import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Grid,
  CardActionArea,
  CardActions,
  CardHeader,
  Chip,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../actions/blogAction";
import { red } from "@mui/material/colors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

function BlogCards2() {
  const dispatch = useDispatch();
  const { allBlogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
    //allBlogs.unshift(userBlogs);
  }, []);

  //const reduceWords = (str) => {
  //return str.length > 300 ? str.substring(0, 220) + "..." : str;
  //};

  return (
    <>
      {allBlogs.map((blog) => (
        <Grid item key={blog.id} style={{ display: "flex" }}>
          <Card
            variant="outlined"
            sx={{
              maxWidth: 345,
              mb: 2,
              pb: 2,
              "&:hover": {
                backgroundColor: "silver[400]",
                transform: "scale(1.01)",
                boxShadow: "1px 1px 30px silver",
              },
            }}
          >
            <CardActionArea
              LinkComponent={Link}
              to={`/blog/${blog.id}/${blog.title}`}
            >
              <CardHeader
                title={<Typography> {blog.title}</Typography>}
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="140"
                image="https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Countries
                </Typography>

                <Typography variant="body2" color="text.primary">
                  {blog.body}
                </Typography>
              </CardContent>

              <CardActions>
                <Stack
                  display="flex"
                  direction="row"
                  spacing={8}
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                  <Typography variant="body2">Blogger Name</Typography>
                  <Chip icon={<VisibilityIcon />} label="100" />
                </Stack>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default BlogCards2;
