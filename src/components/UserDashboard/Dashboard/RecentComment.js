import React from "react";
import { List, ListSubheader, Button } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function RecentComment() {
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 350,
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
      subheader={
        <ListSubheader sx={{ typography: "h6", fontWeight: 700 }}>
          Recent Comments
        </ListSubheader>
      }
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
            <React.Fragment>
              {"has commented"}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I'll be in your neighborhood doing errands this…
              </Typography>
              <br />
              <Button color="info">Reply</Button>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
            <React.Fragment>
              {"has commented"}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I'll be in your neighborhood doing errands this…
              </Typography>
              <br />
              <Button color="info">Reply</Button>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
            <React.Fragment>
              {"has commented"}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                I'll be in your neighborhood doing errands this…
              </Typography>
              <br />
              <Button color="info">Reply</Button>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
