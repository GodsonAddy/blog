import React from "react";
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
  ListItemIcon
} from "@mui/material";
import { makeStyles } from '@mui/styles';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from '@mui/icons-material/Logout';

const pages = ["ABOUT", "NEWS", "BLOGS"];


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    //vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));



export default function NavigationBar({ history, children }, props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { userAuth } = useSelector((state) => state.loginAuth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const userAccount = () => {
    localStorage.setItem("isAuthenticated", "true");
    window.location.pathname = "/myaccount/dashboard";
  };

  const loginClick = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.pathname = "/login";
  };

  return (
    <Box>
      <CssBaseline />
      <Box sx={{ marginTop: 10, marginBottom: 10 }}>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item >
            <Typography
              variant="h2"
              sx={{
                mb: 5,
              }}
            >
              vibes
              <sup>&reg;</sup>
            </Typography>
          </Grid>
          <Grid item>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 500,
              }}
              elevation={3}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,

                }}
                placeholder="Search for blogs..."
                inputProps={{ "aria-label": "search for blogs..." }}
                className={classes.inputInput}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* App Bar */}

      <Box>
        <AppBar position="static" >
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
                {userAuth ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={loginClick}
                  >
                    Login/Signup
                  </Button>
                ) : (
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle color="secondary" />
                  </IconButton>
                )}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}

                  keepMounted

                  open={Boolean(anchorEl)}
                  onClose={handleClose}

                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,

                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={userAccount}>
                    <ListItemIcon>
                      <Avatar />
                    </ListItemIcon>
                    <ListItemText>My Dashboard</ListItemText>

                  </MenuItem>
                  <MenuItem onClick={loginClick}>
                    <ListItemIcon> <Logout fontSize="small" /></ListItemIcon>
                    <ListItemText>Logout</ListItemText>

                  </MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </Box>
  );
}
