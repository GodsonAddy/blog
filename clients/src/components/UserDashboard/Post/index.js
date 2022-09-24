import React, { useEffect, useState } from "react";
import UserDashboard from "..";
import {
  Typography,
  InputLabel,
  OutlinedInput,
  Grid,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { CustomSelect, StyledOption, Input } from "./util";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import { createBlog } from "../../../features/actions/blogAction";
import { useSelector, useDispatch } from "react-redux";
import { resetBlog } from "../../../features/reducer/blogReducer";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  content: "",
  //category: "",
};

const categoryGroup = ["Movies", "Countries", "Technology", "Games"];

function Posted() {
  const [formValues, setFormValues] = useState(initialState);
  const [category, setCategory] = useState(categoryGroup);
  const [postError, setPostError] = useState({});

  const dispatch = useDispatch();

  const { blogMessage, blogError, loader } = useSelector((state) => state.blog);
  const { title, content } = formValues;

  useEffect(() => {
    if (blogError) {
      toast.error(blogMessage);
    }
    dispatch(resetBlog());
  }, [blogError, blogMessage, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((values) => ({
      ...values,
      [name]: value,
    }));

    if (value !== "") {
      setPostError((prev) => {
        return { ...prev, [name]: null };
      });
    } else {
      setPostError((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
  };

  const PostBlog = async (e) => {
    e.preventDefault();

    if (!title) {
      setPostError((prev) => {
        return { ...prev, title: "Title is required" };
      });
      return;
    }
    if (!content) {
      setPostError((prev) => {
        return { ...prev, content: "Content is required" };
      });
      return;
    }

    const body = { title, content, category };
    //console.log("body", body);
    //console.log("category", category);
    const resultAction = await dispatch(createBlog(body));

    if (createBlog.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      //console.log("user", user);
      toast.success(user.msg);
      setFormValues(initialState);
      setCategory("");
    } else {
      if (resultAction.payload) {
        //toast.error(`Login failed: ${resultAction.payload}`);
      } else {
        toast.error(resultAction.payload);
      }
    }
  };

  return (
    <UserDashboard>
      <Box>
        <Grid container display="flex" flexDirection="column" spacing={2}>
          <Box component="form" noValidate onSubmit={PostBlog}>
            <Grid item>
              <Typography variant="h3"> Add New Post</Typography>
            </Grid>
            <Grid item marginTop={2}>
              <TextField
                label="Blog Title"
                variant="outlined"
                type="text"
                id="title"
                required
                name="title"
                fullWidth
                onChange={handleChange}
                value={title}
                error={!!postError.title}
                helperText={postError ? postError.title : null}
              />
            </Grid>
            <Grid item marginTop={2}>
              <InputLabel id="select-category-label">
                Select a Category
              </InputLabel>
              <CustomSelect
                labelId="select-category-label"
                id="select-category"
                label="Select Category"
                value={category}
                onChange={setCategory}
                name="select-category"
                required
              >
                {categoryGroup.map((group) => (
                  <StyledOption key={group} value={group}>
                    {group}
                  </StyledOption>
                ))}
              </CustomSelect>
            </Grid>
            <Grid item>
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  endIcon={<PhotoCamera />}
                  sx={{ color: "secondary.main" }}
                >
                  Upload Files
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                  />
                </Button>
              </label>
            </Grid>
            <Grid item marginTop={5}>
              <OutlinedInput
                type="text"
                multiline
                rows={10}
                fullWidth
                onChange={handleChange}
                value={content}
                id="content"
                name="content"
                error={!!postError.content}
                helpertext={postError ? postError.content : null}
              />
            </Grid>
            <Grid item marginTop={5}>
              <LoadingButton
                endIcon={<SendIcon />}
                loading={loader}
                loadingPosition="end"
                variant="contained"
                type="submit"
                sx={{ color: "secondary.main" }}
              >
                Post
              </LoadingButton>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </UserDashboard>
  );
}

export default Posted;
