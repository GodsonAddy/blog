import React from "react";
import { Box, CssBaseline, useScrollTrigger, Zoom, Fab } from "@mui/material";
import { withRouter } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import LandingFooter from "./landingfooter";
import NavigationBar from "./NavigationBar";
import MainPage from "./MainPage";
import CarouselImage from "./BlogCarousel/carouselImage";

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

const LandingPage = ({ history}, props) => {
 

  return (
    <>
      <CssBaseline />

      <NavigationBar />
      {/* Carousel */}

      <CarouselImage />
      {/* Main Page */}
      <MainPage />
      {/* Scroll to the top*/}
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon color="secondary" />
        </Fab>
      </ScrollTop>

      {/* Main Body*/}
      <LandingFooter />
    </>
  );
};

export default withRouter(LandingPage);
