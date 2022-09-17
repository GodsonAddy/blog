import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
  Container,
  Menu,
  MenuItem,
  CssBaseline,
  Avatar,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../../features/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/reducer/userReducer";
import { googleLogout } from "@react-oauth/google";
import { SearchDialog } from "./MainPage/util";

const pages = [
  { name: "ABOUT", link: "/about" },
  { name: "NEWS", link: "/news" },
  { name: "BLOGS", link: "/blog" },
];

export default function NavigationBar() {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUserInfo } = useSelector((state) => state.auth);

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: authUserInfo?.color,
      },
      children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
    };
  }

  function stringSmallAvatar(name) {
    return {
      sx: {
        bgcolor: authUserInfo?.color,
        width: 24,
        height: 24,
        fontSize: 14,
      },
      children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
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

  const handleOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };

  const handleCloseSearchDialog = (value) => {
    setOpenSearchDialog(false);
  };

  return (
    <Box>
      <CssBaseline />
      <Box sx={{ backgroundColor: "tertiary.main" }}>
        <Typography
          variant="h2"
          sx={{
            letterSpacing: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          id="logo"
          color="secondary"
        >
          <sup style={{ fontSize: "16px" }}>THE</sup>BLOGMENTARY
        </Typography>
      </Box>

      {/* App Bar */}

      <Box>
        <AppBar
          position="static"
          sx={{ color: "tertiary.main", backgroundColor: "secondary.main" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters id="back-to-top-anchor">
              <Button
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  color: "tertiary.main",
                }}
                onClick={() => navigate("/")}
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
                  {pages.map(({ name, link }) => (
                    <MenuItem key={name} onClick={() => navigate(link)}>
                      <Typography textAlign="center" sx={{ fontWeight: 700 }}>
                        {name}
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
                  color: "tertiary.main",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                HOME
              </Button>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map(({ name, link }) => (
                  <Button
                    key={name}
                    onClick={() => navigate(link)}
                    sx={{
                      my: 2,
                      display: "block",
                      fontWeight: 700,
                      color: "tertiary.main",
                    }}
                  >
                    {name}
                  </Button>
                ))}
              </Box>
              <IconButton
                size="large"
                aria-label="search"
                onClick={handleOpenSearchDialog}
              >
                <SearchIcon />
              </IconButton>

              <SearchDialog
                open={openSearchDialog}
                onClose={handleCloseSearchDialog}
              />
              <div>
                {/* userAuth */}
                {!authUserInfo && (
                  <Box>
                    <Button
                      variant="contained"
                      onClick={handleLogin}
                      sx={{
                        color: "secondary.main",
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
                  <Box>
                    <Tooltip title="My Account">
                      <IconButton
                        size="large"
                        onClick={handleOpenUserMenu}
                        color="inherit"
                      >
                        {authUserInfo?.avatar ? (
                          <Avatar
                            alt={authUserInfo?.name}
                            src={authUserInfo?.avatar}
                          />
                        ) : (
                          <Avatar
                            alt={authUserInfo?.name}
                            sx={{ width: 24, height: 24 }}
                            {...stringAvatar(authUserInfo?.name)}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                <Box>
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
                        {authUserInfo?.avatar ? (
                          <Avatar
                            alt={authUserInfo?.name}
                            src={authUserInfo?.avatar}
                            sx={{ width: 24, height: 24 }}
                          />
                        ) : (
                          <Avatar
                            alt={authUserInfo?.name}
                            {...stringSmallAvatar(authUserInfo?.name)}
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
