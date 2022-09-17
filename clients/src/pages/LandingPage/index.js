import React from "react";
import { Box, useScrollTrigger, Zoom, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import LandingFooter from "../../components/LandingPage/landingfooter";
import NavigationBar from "../../components/LandingPage/NavigationBar";

function ScrollTop(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const LandingPage = ({ children }, props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* <CssBaseline /> */}

      <NavigationBar />
      {/* Carousel */}

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      {/* Scroll to the top*/}
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon color="secondary" />
        </Fab>
      </ScrollTop>

      {/* Main Body*/}
      <LandingFooter />
    </Box>
  );
};

export default LandingPage;
