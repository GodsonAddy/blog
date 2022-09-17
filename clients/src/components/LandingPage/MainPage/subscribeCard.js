import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import React from "react";

function SubscribeCard() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 345,
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: "16px",
        p: 2,
        //minWidth: 300,
      }}
    >
      <Typography variant="h6" marginBottom={5} fontWeight={700}>
        NEWSLETTER
      </Typography>
      <Typography variant="body1" marginBottom={3}>
        Subscribe to newsletter to be updated with all the latest trends and
        products.
      </Typography>
      <OutlinedInput
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        type="email"
        placeholder="Email Address"
        sx={{ mb: 3 }}
      />
      <Button variant="outlined">Subscribe</Button>
    </Box>
  );
}

export default SubscribeCard;
