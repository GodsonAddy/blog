import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import BlogCards2 from "./blogCards2";
import MediaCard from "./mediaCrd";
import ListCards from "./ListCards";
import SubscribeCard from "./subscribeCard";

function MainPage() {
  return (
    <Box
      sx={{
        px: 12,
        
        py: 5
      }}
    >
      <Grid
        container
        display="flex"
        direction="row"
        justifyContent="space-between"
      >
        <Grid
          container
          sx={{
            flex: 1,
          }}
          spacing={1}
          
        >
          <BlogCards2 />
        </Grid>
        
        <Grid
          item
          style={{display: "flex"}}
          marginTop={2}
          xs={3}
          sm='auto'
        >
        <Grid
          container
          display="flex"
          direction='column'
          spacing={2}
          sx={{flex: '1'}}
        
        >
          
          <Grid item>
            <MediaCard />
          </Grid>
          <Grid item >
            <ListCards />
          </Grid>
          <Grid item>
              <SubscribeCard />
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainPage;
