import React from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
// import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../index.css";
// import { DeleteDialog } from "./util";

function BlogTable() {
  // const [open, setOpen] = useState(false);

  //const { allBlogs } = useSelector((state) => state.blogs);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const columns = [
  //   { field: "id", headerName: "ID" },
  //   {
  //     field: "title",
  //     headerName: "Blog Title",
  //     width: 180,
  //     renderCell: (params) => (
  //       <Tooltip title={params.row.title}>
  //         <span className="table-cell-trucate">{params.row.title}</span>
  //       </Tooltip>
  //     ),
  //   },
  //   {
  //     field: "date",
  //     headerName: "Post Date",
  //     type: "date",
  //     width: 160,
  //   },
  //   { field: "category", headerName: "Category", width: 180 },
  //   {
  //     field: "comment",
  //     headerName: "Comment",
  //     type: "number",
  //     width: 180,
  //   },
  //   {
  //     field: "like",
  //     headerName: "Like",
  //     type: "number",
  //     width: 160,
  //   },
  //   {
  //     field: "shared",
  //     headerName: "Shared",
  //     type: "number",
  //     width: 160,
  //   },
  //   {
  //     field: "viewers",
  //     headerName: "Viewers",
  //     type: "number",
  //     width: 160,
  //   },

  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     type: "actions",
  //     width: 100,
  //     getActions: () => [
  //       <GridActionsCellItem
  //         icon={
  //           <Tooltip title="Edit">
  //             <EditIcon color="primary" />
  //           </Tooltip>
  //         }
  //         label="Edit"
  //       />,
  //       <GridActionsCellItem
  //         icon={
  //           <Tooltip title="Delete">
  //             <DeleteIcon color="error" onClick={handleClickOpen} />
  //           </Tooltip>
  //         }
  //         label="Delete"
  //       />,
  //     ],
  //   },
  // ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid container justifyContent="flex-end" alignItems="flex-end">
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            color="primary"
            href="/myaccount/posts"
          >
            Add a blog
          </Button>
        </Grid>
      </Grid>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          {/* <DataGrid
            getRowId={(row) => row?.id}
            rows={allBlogs}
            columns={columns}
            initialState={{
              pinnedColumns: { left: ["title"], right: ["actions"] },
            }}
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: CircularProgress
            }}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",

              },
            }}
            loading

          /> */}
          {/* <DeleteDialog open={open} handleClose={handleClose} /> */}
        </div>
      </div>
    </div>
  );
}

export default BlogTable;
