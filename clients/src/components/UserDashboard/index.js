import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";
import { Drawer, DrawerHeader, BootstrapTooltip } from "./index.styles.js";
import "./index.css";
import { useDrawerContext } from "../../context/drawer.context.js";
import { lists, StyledList } from "./util";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBar from "./menubar";
import PostAddIcon from "@mui/icons-material/PostAdd";

function UserDashboard({ children }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { drawerOpen, handleDrawer } = useDrawerContext();
  const { listOpen, handleListOpen } = useDrawerContext();

  const location = useLocation();

  // useEffect(() => {
  //   if (!authUserInfo) {
  //     navigate("/login");
  //   }
  // }, [authUserInfo, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <MenuBar />

      {/* <Router> */}
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={() => handleDrawer(!drawerOpen)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <Divider />

        {/* Lists */}

        <StyledList>
          {lists.map(({ key, label, icon: Icon, items, link }) => {
            return (
              <div key={key}>
                {items !== null ? (
                  <div key={key}>
                    <BootstrapTooltip title={label} placement="right">
                      <ListItemButton
                        onClick={() =>
                          handleListOpen((prevState) => ({
                            ...prevState,
                            [key]: !prevState[key],
                          }))
                        }
                      >
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                        {listOpen[key] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </BootstrapTooltip>
                    <Collapse in={listOpen[key]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {items.map(
                          ({
                            key: childKey,
                            label: childLabel,
                            icon: ChildIcon,
                            link: childLink,
                          }) => (
                            <BootstrapTooltip
                              title={childLabel}
                              placement="right"
                            >
                              <ListItemButton
                                key={childKey}
                                selected={location.pathname === childLink}
                                onClick={() => navigate(childLink)}
                              >
                                <ListItemIcon>
                                  <ChildIcon />
                                </ListItemIcon>
                                <ListItemText primary={childLabel} />
                              </ListItemButton>
                            </BootstrapTooltip>
                          )
                        )}
                      </List>
                    </Collapse>
                  </div>
                ) : (
                  <BootstrapTooltip title={label} placement="right">
                    <ListItemButton
                      onClick={() => navigate(link)}
                      key={key}
                      selected={location.pathname === link}
                    >
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </BootstrapTooltip>
                )}
              </div>
            );
          })}
        </StyledList>
        <Box
          sx={{
            margin: "200px 10px 0 10px",
            backgroundColor: "#00b8d4",
            color: "secondary.main",
            fontWeight: "bolder",
            borderRadius: 5,
          }}
        >
          <BootstrapTooltip title="Posts" placement="right">
            <ListItemButton
              onClick={() => navigate("/myaccount/posts")}
              selected={location.pathname === "/myaccount/posts"}
            >
              <ListItemIcon>
                <PostAddIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Posts" />
            </ListItemButton>
          </BootstrapTooltip>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
      {/* </Router> */}
    </Box>
  );
}

export default UserDashboard;
