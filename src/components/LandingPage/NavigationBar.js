import React from 'react';
import {AppBar, Toolbar, Typography, Button, InputBase, IconButton, Box, Grid, Container, Divider,
    Paper, Menu, MenuItem
} 
from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { logout } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';




const pages = ['ABOUT', 'NEWS', 'BLOGS'];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function NavigationBar ({history, children}, props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const{userAuth} = useSelector(state => state.loginAuth)


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

  const Submit = () => {
    history.push("/")
  }

  const userAccount = () => {
    localStorage.setItem("isAuthenticated", "true");
    window.location.pathname = "/mydashboard";
  }

  const loginClick = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.pathname ="/login"

  }

    return (
        <>
            <Box sx={{marginTop: 10, marginBottom: 10}}
                    
                    >
       
            <Grid
                container
                component="main"
                sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
    
                <Grid item xs={8} sm={8} md={5}>
    
                   
                    
                            <Typography
                                variant="h2"
                                sx={{
                                    mb: 5
                                }}
                            >
                                vibes
                                <sup>&reg;</sup>
                            </Typography>
                        
                </Grid>
                <Grid item xs={12} sm={12}>
    
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500}}
                            elevation={3}
                            
                        >
                    
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search for blogs..."
                                inputProps={{ 'aria-label': 'search for blogs...' }}
                                className={classes.inputInput}
                            />
                            
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
                                <SearchIcon />
                            </IconButton>
                        </Paper>
    
                  
                </Grid>
            </Grid>
            </Box>
    
            {/* App Bar */} 
    
            <div>
    
                <AppBar position="static" color='secondary'>
                    <Container maxWidth="xl">
                    <Toolbar disableGutters id="back-to-top-anchor">
              <Button
                
                sx={{flexGrow: 1, mr: 2, display: { xs: 'none', md: 'flex' }, fontWeight: 700 }}
              >
                HOME
              </Button>
    
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" sx={{color: "primary", fontWeight: 700}}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Button
      
                
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontWeight: 700 }}
              >
                HOME
              </Button>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'primary', display: 'block', fontWeight: 700 }}
                    
                  >
                    {page}
                  </Button>
                ))}
              </Box>
    
              <div>
                    {userAuth ? 
                    <Button 
                      color='tertiary'
                      variant='contained'
                      onClick={loginClick}
                    >
                      Login/Signup
                    </Button> 
                    : 
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                  <AccountCircle />
                </IconButton>
}
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
                  <MenuItem onClick={userAccount}>My Dashboard</MenuItem>
                  <MenuItem onClick={loginClick}>LOGOUT</MenuItem>
                </Menu>
                  
              </div>
                        
            </Toolbar>
          </Container>
        </AppBar>
                
                  
      </div>
              
    </>
  )
}