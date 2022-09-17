import React from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";
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
