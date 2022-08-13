import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { List, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Badges = () => {
  return (
    <Badge badgeContent={17} color="error">
      <NotificationsNoneOutlinedIcon />
    </Badge>
  );
};
export const lists = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    link: "/myaccount/dashboard",
    items: null,
  },
  {
    key: "lists",
    label: "Lists",
    icon: ViewListRoundedIcon,
    link: "/myaccount/lists",
    items: null,
  },

  {
    key: "trending",
    label: "Trending",
    icon: TagRoundedIcon,
    link: "/myaccount/trends",
    items: null,
  },

  {
    key: "profile",
    label: "Profile",
    icon: FaceRoundedIcon,
    link: "/myaccount/profile",
    items: null,
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: Badges,
    link: "/myaccount/notifications",
    items: null,
  },
  {
    key: "settings",
    label: "Settings",
    icon: SettingsIcon,
    link: "/myaccount/settings",
    items: null,
  },
];

export const StyledList = styled(List)({
  // selected and (selected + hover) states
  "&& .Mui-selected, && .Mui-selected:hover": {
    backgroundColor: "#00b8d4",
    fontWeight: "bolder",
    borderRadius: 5,
    margin: "0 10px",

    "&, & .MuiListItemIcon-root": {
      color: "white",
    },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "silver",
    fontWeight: "bolder",
    borderRadius: 5,
    margin: " 0 10px",
    "&, & .MuiListItemIcon-root": {
      color: "white",
    },
  },
});
