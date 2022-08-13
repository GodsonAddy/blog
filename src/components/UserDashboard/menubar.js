import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  OutlinedInput,
  InputAdornment,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useDrawerContext } from "../../context/drawer.context.js";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "./index.styles.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/reducer/userReducer.js";
import { logout } from "../../features/actions/userAction.js";
import { googleLogout } from "@react-oauth/google";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: "#000",
  width: 250,
  fontSize: "0.875rem",
  fontWeight: "bolder",
  lineHeight: "1.5",
  borderRadius: 16,
  height: 40,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { drawerOpen, handleDrawer } = useDrawerContext();
  const { authUserInfo } = useSelector((state) => state.auth);

  const isMenuOpen = Boolean(anchorElNav);
  const isMobileMenuOpen = Boolean(anchorElUser);

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

  const handleLogOut = () => {
    dispatch(logout());
    googleLogout();
    dispatch(reset());
    handleCloseUserMenu();
    navigate("/");
  };

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: authUserInfo.color,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleCloseNavMenu}
    >
      <MenuItem onClick={() => navigate("/myaccount/settings")}>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleCloseUserMenu}
    >
      <MenuItem>
        <IconButton size="large" onClick={() => navigate("/")}>
          <HomeRoundedIcon />
        </IconButton>

        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneOutlinedIcon
              onClick={() => navigate("/myaccount/notifications")}
            />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleOpenNavMenu}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {authUserInfo?.avatar ? (
            <Avatar alt={authUserInfo.name} src={authUserInfo?.avatar} />
          ) : (
            <Avatar
              alt={authUserInfo.name}
              {...stringAvatar(authUserInfo.name)}
            />
          )}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" open={drawerOpen} color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(drawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
            fontWeight="bolder"
          >
            vibes
            <sup>&reg;</sup>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Search>
            <StyledInputBase
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box mx={2}>
              <IconButton size="large" onClick={() => navigate("/")}>
                <HomeRoundedIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsNoneOutlinedIcon
                    onClick={() => navigate("/myaccount/notifications")}
                  />
                </Badge>
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                mx: 2,
              }}
            >
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, mr: 2 }}
              >
                {`Hello ${authUserInfo.name}`}
              </Typography>
              {authUserInfo?.avatar ? (
                <Avatar alt={authUserInfo.name} src={authUserInfo?.avatar} />
              ) : (
                <Avatar
                  alt={authUserInfo.name}
                  {...stringAvatar(authUserInfo.name)}
                />
              )}

              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <KeyboardArrowDownIcon color="#000" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
}
