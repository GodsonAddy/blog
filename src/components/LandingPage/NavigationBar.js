import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  IconButton,
  Box,
  Grid,
  Container,
  Divider,
  Paper,
  Menu,
  MenuItem,
  CssBaseline,
  Avatar,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../../features/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/reducer/userReducer";
import { googleLogout } from "@react-oauth/google";

const pages = ["ABOUT", "NEWS", "BLOGS"];

export default function NavigationBar() {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();
  const { authUserInfo } = useSelector((state) => state.auth);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: authUserInfo.color,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  function stringSmallAvatar(name) {
    return {
      sx: {
        bgcolor: authUserInfo.color,
        width: 24,
        height: 24,
        fontSize: 14,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userAccount = () => {
    navigate("/myaccount/dashboard");
  };

  const handleLogOut = () => {
    dispatch(logout());
    googleLogout();
    dispatch(reset());
    handleCloseUserMenu();
    navigate("/");
  };

  const handleLogin = () => {
    dispatch(reset());
    navigate("/login");
  };

  return (
    <Box>
      <CssBaseline />
      <Container>
        <Grid
          container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={5}
          mb={10}
        >
          <Grid item mb={5} xs={12}>
            <Typography variant="h2">
              vibes
              <sup>&reg;</sup>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
                [theme.breakpoints.down("sm")]: {
                  width: "32ch",
                  "&:focus": {
                    width: "20ch",
                  },
                },
              }}
              elevation={3}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  padding: (theme) => theme.spacing(1, 1, 1, 0),
                  //vertical padding + font size from searchIcon
                  paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)}px)`,
                  transition: (theme) => theme.transitions.create("width"),
                  width: "100%",
                }}
                placeholder="Search for blogs..."
                inputProps={{ "aria-label": "search for blogs..." }}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* App Bar */}

      <Box>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters id="back-to-top-anchor">
              <Button
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                }}
                color="secondary"
                href="/"
              >
                HOME
              </Button>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="secondary"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        sx={{ color: "primary", fontWeight: 700 }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Button
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                  fontWeight: 700,
                }}
                color="secondary"
                href="/"
              >
                HOME
              </Button>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      display: "block",
                      fontWeight: 700,
                    }}
                    color="secondary"
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <div>
                {/* userAuth */}
                {!authUserInfo && (
                  <Box sx={{ flexGrow: 0 }}>
                    <Button
                      variant="contained"
                      onClick={handleLogin}
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        "&:hover": {
                          color: "secondary.main",
                        },
                      }}
                    >
                      Login/Signup
                    </Button>
                  </Box>
                )}
                {authUserInfo && (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="My Account">
                      <IconButton
                        size="large"
                        onClick={handleOpenUserMenu}
                        color="inherit"
                      >
                        {authUserInfo?.avatar ? (
                          <Avatar alt="avatar" src={authUserInfo?.avatar} />
                        ) : (
                          <Avatar
                            alt={authUserInfo.name}
                            sx={{ width: 24, height: 24 }}
                            {...stringAvatar(authUserInfo.name)}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                <Box sx={{ flexGrow: 0 }}>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    keepMounted
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    sx={{ mt: "45px" }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "top" }}
                  >
                    <MenuItem onClick={userAccount}>
                      <ListItemIcon>
                        {authUserInfo?.avatar !== "" ? (
                          <Avatar
                            alt="avatar"
                            src={authUserInfo?.avatar}
                            sx={{ width: 24, height: 24 }}
                          />
                        ) : (
                          <Avatar
                            alt={authUserInfo.name}
                            {...stringSmallAvatar(authUserInfo.name)}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText>My Dashboard</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>
                      <ListItemIcon>
                        {" "}
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </Box>
  );
}
