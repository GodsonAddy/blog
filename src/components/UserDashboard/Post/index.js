import React, { useState } from "react";
import UserDashboard from "..";
import {
  Typography,
  InputLabel,
  OutlinedInput,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { CustomSelect, StyledOption, Input } from "./util";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from '@mui/lab/LoadingButton';




function Posted() {

  const [loading, setLoading] = useState(false);

  const PostBlog = () => {
    setLoading(false)
  }

  return (
    <UserDashboard>
      <Box>
        <Grid
          container
          display="flex"
          flexDirection="column"
          spacing={2}
          xs={8}
        >
          <Grid item>
            <Typography variant="h3"> Add New Post</Typography>
          </Grid>
          <Grid item marginTop={2}>
            <OutlinedInput type="text" fullWidth />
          </Grid>
          <Grid item marginTop={2}>
            <InputLabel>Select a Category</InputLabel>
            <CustomSelect placeholder="Select Category">
              <StyledOption value="Games">Games</StyledOption>
              <StyledOption value="Movies">Movies</StyledOption>
              <StyledOption value="Technology">Technology</StyledOption>
              <StyledOption value="Countries">Countries</StyledOption>
            </CustomSelect>
          </Grid>
          <Grid item>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button
                variant="contained"
                component="span"
                endIcon={<PhotoCamera />}
              >
                Upload Files
              </Button>
            </label>
          </Grid>
          <Grid item marginTop={5}>
            <OutlinedInput type="text" multiline rows={10} fullWidth />
          </Grid>
          <Grid item marginTop={5}>
            <LoadingButton
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              onClick={PostBlog}
            >
              Publish
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </UserDashboard>
  );
}

export default Posted;
