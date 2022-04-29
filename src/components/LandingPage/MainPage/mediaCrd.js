import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import vibes from "../../../images/vibes.png"

function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={1}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={vibes}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          VIBES
        </Typography>
        <Typography variant="body2" color="text.secondary">
          VIBES is a blog page purposely for our everyday activities
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default MediaCard;
