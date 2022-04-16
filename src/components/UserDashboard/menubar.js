import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
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
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDrawerContext } from "../../context/drawer.context.js";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from './index.styles.js';
import { useHistory } from "react-router-dom";



const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));



const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
    color: '#000',
    width: 250,
    fontSize: '0.875rem',
    fontWeight: 'bolder',
    lineHeight: '1.5',
    borderRadius: 16,
    height: 40,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));




export default function MenuBar() {

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const { drawerOpen, handleDrawer } = useDrawerContext();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogOut = () => {
        localStorage.clear();
        window.location.pathname = "/login";
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large">
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
                        <NotificationsNoneOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar>GA</Avatar>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>

            <AppBar


                position="fixed" open={drawerOpen} color="secondary"
            >
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
                        
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        
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
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}

                    >
                        <Box mx={2}>
                            <IconButton size="large" onClick={() => history.push("/")}>
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
                                    <NotificationsNoneOutlinedIcon />
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
                                sx={{ display: { xs: "none", sm: "block" } }}
                            >
                                {loginInfo?.statusCode === 200
                                    ? `Hello` + loginInfo?.first_name + loginInfo?.lastt_name
                                    : ""}
                            </Typography>
                            <Avatar>GA</Avatar>



                            <IconButton
                                size="small"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}

                            >
                                <KeyboardArrowDownIcon color="#000" />
                            </IconButton>
                        </Box>

                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
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
