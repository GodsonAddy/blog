import React from "react";
import { useTheme } from "@mui/material/styles";
import{
  Box,
  List,
  CssBaseline,
  Divider,
  IconButton,
  Collapse
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  BrowserRouter,
  withRouter,
  useHistory,
  useLocation
} from "react-router-dom";
import {
  Drawer,
  DrawerHeader,
  BootstrapTooltip,
} from "./index.styles.js";
import "./index.css";
import { useDrawerContext } from "../../context/drawer.context.js";
import { lists, StyledList } from './util';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuBar from './menubar';




function UserDashboard({ children }) {
  const history = useHistory();
  const theme = useTheme();
  const { drawerOpen, handleDrawer } = useDrawerContext();
  const { listOpen, handleListOpen } = useDrawerContext()

  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <MenuBar />
      
      <BrowserRouter>
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
                    <ListItemButton onClick={() => handleListOpen((prevState => ({ ...prevState, [key]: !prevState[key] })))}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={label} />
                      {listOpen[key] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    </BootstrapTooltip>
                    <Collapse in={listOpen[key]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {items.map(({ key: childKey, label: childLabel, icon: ChildIcon, link: childLink }) => (
                           <BootstrapTooltip title={childLabel} placement="right">
                          <ListItemButton
                            key={childKey}
                            selected={location.pathname === childLink}
                            onClick={() => history.push(childLink)}
                          >
                            <ListItemIcon>
                              <ChildIcon />
                            </ListItemIcon>
                            <ListItemText primary={childLabel} />
                          </ListItemButton>
                          </BootstrapTooltip>
                        ))}
                      </List>
                    </Collapse>
                  </div>
                ) : (
                  <BootstrapTooltip title={label} placement="right">
                  <ListItemButton
                    onClick={() => history.push(link)}
                    key={key}
                    selected={location.pathname === link}
                  >
                    <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                    <ListItemText
                      primary={label}
                    />
                  </ListItemButton>
                  </BootstrapTooltip>
                )}
              </div>
            );

          })}
          </StyledList>
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
