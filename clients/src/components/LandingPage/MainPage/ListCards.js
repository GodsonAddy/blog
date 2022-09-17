import React, { useEffect } from "react";
import {
  List,
  ListSubheader,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemButton,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GetAtLeast3Blogs } from "../../../features/actions/blogAction";

export default function AlignItemsList() {
  const { allBlogs, loader } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAtLeast3Blogs());
  }, [dispatch]);

  const reduceWords = (str) => {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  };

  const reduceTitle = (str) => {
    return str.length > 35 ? str.substring(0, 35) + "..." : str;
  };
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 345,
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: "16px",
        p: 2,
        //minWidth: 300,
      }}
      subheader={
        <ListSubheader sx={{ typography: "h6", fontWeight: 700 }}>
          Trending Topics
        </ListSubheader>
      }
    >
      {loader && <CircularProgress />}
      {allBlogs?.length > 0 ? (
        allBlogs?.map((blog) => (
          <ListItemButton
            alignItems="flex-start"
            key={blog?._id}
            divider
            href={`/blog/${blog.category}/${blog._id}/${blog.slug}`}
          >
            <ListItemAvatar>
              {blog?.author?.avatar ? (
                <Avatar alt={blog?.author?.name} src={blog?.author?.avatar} />
              ) : (
                <Avatar
                  alt={blog?.author?.name}
                  sx={{
                    bgcolor: blog?.author?.color,
                  }}
                >
                  {blog?.author?.initials}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography fontWeight={600}>
                  {reduceTitle(blog?.title)}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    fontWeight={500}
                  >
                    by {blog?.author?.name}
                  </Typography>
                  — {reduceWords(blog?.content)}
                  <br />
                  <Typography color="info" component="span">
                    {blog?.comments?.length} Comments
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItemButton>
        ))
      ) : (
        <Typography component="span">No trending topics...</Typography>
      )}
    </List>
  );
}
