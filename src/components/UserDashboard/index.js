import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Menu, MenuItem, Toolbar } from "@mui/material";
import { List, CssBaseline, Typography, Divider, Button } from "@mui/material";
import { IconButton, Collapse } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  BrowserRouter,
  NavLink,
  withRouter,
  useHistory,
} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  Drawer,
  DrawerHeader,
} from "./index.styles.js";
import './index.css';


const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));


function UserDashboard({ children }) {
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [exit, setExit] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    localStorage.clear();
    window.location.pathname = "/login";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box>
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              
            >
              <Button color='inherit'>  Home</Button>
             
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {loginInfo?.statusCode === 200 ? (`Welcome` + (loginInfo?.first_name) + (loginInfo?.first_name)) : ""}
            </Typography>
            <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                  <Avatar>GA</Avatar>
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                  
                  <MenuItem onClick={handleLogOut}>LOGOUT</MenuItem>
                </Menu>
          </Toolbar>
        </AppBar>
      </Box>

      <BrowserRouter>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          <List>
            

            <Divider />

            <ListItemButton
              component={NavLink}
              to="/myaccount/dashboard"
              onClick={() => history.push("/myaccount/dashboard")}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  "& .Mui-active": { color: "white" },
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="/myaccount/posts"
              onClick={() => history.push("/myaccount/posts")}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  "& .Mui-active": { color: "white" },
                }}
              >
                <DynamicFormIcon />
              </ListItemIcon>
              <ListItemText primary="Posted" />
            </ListItemButton>

            <ListItemButton
              component={NavLink}
              to="/myaccount/settings"
              onClick={() => history.push("/myaccount/settings")}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  "& .Mui-active": { color: "white" },
                }}
              >
                <DynamicFormIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default withRouter(UserDashboard);