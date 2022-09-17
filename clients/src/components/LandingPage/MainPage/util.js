import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  Box,
  Dialog,
  DialogTitle,
  TextField,
  Divider,
  CircularProgress,
  Button,
  ListItemButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { SearchAllUsers } from "../../../features/actions/userAction";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const SearchDialog = ({ onClose, open }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { allusers, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SearchAllUsers(search));
  }, [dispatch, search]);

  //const keys = ["name", "moniker", "email"];

  const SearchEngine = (searched) => {
    setSearch(searched);
    if (searched !== "") {
      const newResults = allusers?.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searched.toLowerCase());

        // return keys.some((key) =>
        //   user[key].toLowerCase().includes(searched.toLowerCase())
        // );
      });
      setSearchResults(newResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearch = async (e) => {
    SearchEngine(e.target.value);
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          mt={2}
        >
          {loading ? (
            <CircularProgress sx={{ mr: 1 }} />
          ) : (
            <SearchIcon sx={{ color: "primary.main", mr: 1 }} />
          )}
          <TextField
            id="input-with-sx"
            placeholder="Search"
            variant="standard"
            fullWidth
            onChange={handleSearch}
            value={search}
            name="search"
            type="search"
          />
          <Button variant="outlined" onClick={onClose} sx={{ ml: 1 }}>
            exit
          </Button>
        </Box>
      </DialogTitle>
      <Divider />
      <List sx={{ pt: 0, mx: 3, pb: 5 }}>
        {/* User's Name */}
        {searchResults[0]?.name && (
          <Typography sx={{ my: 2 }}>Users' name</Typography>
        )}
        {searchResults?.length > 0
          ? searchResults?.slice(0, 10).map((user) => (
              <Box key={user?._id}>
                {user?.name && (
                  <Box>
                    <ListItemButton
                      href={`/user/${user?._id}/${user?.moniker}`}
                      sx={{
                        "&:hover": {
                          border: "1px solid #00b8d4",
                          borderRadius: "5px",
                          backgroundColor: "#e0f7fa",
                          color: "#00b8d4",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        {user?.avatar ? (
                          <Avatar alt={user?.name} src={user?.avatar} />
                        ) : (
                          <Avatar
                            alt={user?.name}
                            sx={{
                              bgcolor: user?.color,
                            }}
                          >
                            {user?.initials}
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText primary={user?.name} />
                    </ListItemButton>
                    <Divider />
                  </Box>
                )}
              </Box>
            ))
          : null}

        {/* Blog Title */}
        {searchResults[0]?.blogposts?.title && (
          <Typography sx={{ my: 2 }}>Blog Title</Typography>
        )}
        {searchResults?.length > 0
          ? searchResults?.slice(0, 10).map((user) => (
              <Box key={user?._id}>
                {user?.blogposts?.title && (
                  <Box sx={{ ml: 2 }}>
                    <ListItemButton
                      href={`/blog/${user?.blogposts?.category}/${user?.blogposts?._id}/${user?.blogposts?.slug}`}
                      sx={{
                        "&:hover": {
                          border: "1px solid #00b8d4",
                          borderRadius: "5px",
                          backgroundColor: "#e0f7fa",
                          color: "#00b8d4",
                        },
                      }}
                    >
                      <ListItemText primary={user?.blogposts?.title} />
                    </ListItemButton>
                    <Divider />
                  </Box>
                )}
              </Box>
            ))
          : null}

        {/* Blog Category */}
        {searchResults[0]?.blogposts?.category && (
          <Typography sx={{ my: 2 }}>Blog Category</Typography>
        )}
        {searchResults?.length > 0
          ? searchResults?.slice(0, 10).map((user) => (
              <Box key={user?._id}>
                {user?.blogposts?.category && (
                  <Box sx={{ ml: 2 }}>
                    <ListItemButton
                      href={`/blog/${user?.blogposts?.category}`}
                      sx={{
                        "&:hover": {
                          border: "1px solid #00b8d4",
                          borderRadius: "5px",
                          backgroundColor: "#e0f7fa",
                          color: "#00b8d4",
                        },
                      }}
                    >
                      <ListItemText primary={user?.blogposts?.category} />
                    </ListItemButton>
                    <Divider />
                  </Box>
                )}
              </Box>
            ))
          : null}
        {searchResults?.length === 0 && (
          <Typography sx={{ mt: 2 }}>Try another search</Typography>
        )}
      </List>
    </Dialog>
  );
};

SearchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
