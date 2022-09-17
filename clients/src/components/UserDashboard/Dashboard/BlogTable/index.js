import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Box, Button, CircularProgress, Grid, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "./util";

function BlogTable() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { blogContents, loader } = useSelector((state) => state.blog);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: blogContents?._id, headerName: "ID" },
    {
      field: blogContents?.title,
      headerName: "Blog Title",
      width: 180,
      renderCell: (params) => (
        <Tooltip title={params.row.title}>
          <span className="table-cell-trucate">{params.row.title}</span>
        </Tooltip>
      ),
    },
    {
      field: blogContents?.createdAt,
      headerName: "Post Date",
      type: "date",
      width: 160,
    },
    { field: blogContents?.category, headerName: "Category", width: 180 },
    {
      field: blogContents?.comments,
      headerName: "Comment",
      type: "number",
      width: 180,
    },
    {
      field: blogContents?.favorites,
      headerName: "Favorite",
      type: "number",
      width: 160,
    },
    {
      field: "shared",
      headerName: "Shared",
      type: "number",
      width: 160,
    },
    {
      field: "viewers",
      headerName: "Viewers",
      type: "number",
      width: 160,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      getActions: () => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit">
              <EditIcon color="primary" />
            </Tooltip>
          }
          label="Edit"
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <DeleteIcon color="error" onClick={handleClickOpen} />
            </Tooltip>
          }
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Grid container justifyContent="flex-end" alignItems="flex-end">
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            color="primary"
            onClick={() => navigate("/myaccount/posts")}
          >
            Add a blog
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            getRowId={(row) => row?._id}
            rows={blogContents}
            columns={columns}
            initialState={{
              pinnedColumns: { left: ["title"], right: ["actions"] },
            }}
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: CircularProgress,
            }}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            loading={loader}
          />
          <DeleteDialog open={open} handleClose={handleClose} />
        </Box>
      </Box>
    </Box>
  );
}

export default BlogTable;
