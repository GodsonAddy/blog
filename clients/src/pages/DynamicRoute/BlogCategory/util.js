import React from "react";
import {
  Grid,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.blog);

  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`?page=${item.page}`}
          />
        )}
      />
    </Stack>
  );
};

export const NotFound = () => {
  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      mt={10}
      mb={5}
    >
      <Grid item>
        <Typography variant="h1">404</Typography>
      </Grid>

      <Grid item>
        <Typography variant="h6">OOOPS, PAGE NOT FOUND!</Typography>
      </Grid>

      <Grid item>
        <Typography variant="body1">
          The page you are looking for either has been moved or doesn't exist in
          the server.Try search again!
        </Typography>
      </Grid>
    </Grid>
  );
};
