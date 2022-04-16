import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { List } from "@mui/material";
import { styled } from "@mui/material/styles";

export const lists = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: DashboardIcon,
        link: "/myaccount/dashboard",
        items: null
    },
    {
        key: "posts",
        label: "Posts",
        icon: PostAddIcon,
        link: "/myaccount/posts",
        items: null
    },
    {
        key: "settings",
        label: "Settings",
        icon: SettingsIcon,
        link: "/myaccount/settings",
        items: null
    },
];


export const StyledList = styled(List)({
    // selected and (selected + hover) states
    "&& .Mui-selected, && .Mui-selected:hover": {
      backgroundColor: "#00b8d4",
      fontWeight: "bolder",
      borderRadius: 5,
  
      "&, & .MuiListItemIcon-root": {
        color: "white",
      },
    },
    // hover states
    "& .MuiListItemButton-root:hover": {
      backgroundColor:"#84ffff",
      fontWeight: "bolder",
      borderRadius: 5,
      "&, & .MuiListItemIcon-root": {
        color: "white",
      },
    },
  });
