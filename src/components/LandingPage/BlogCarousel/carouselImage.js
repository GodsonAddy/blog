import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Image,
  ImageBackdrop,
  ImageButton,
  ImageMarked,
  ImageSrc,
} from "./FiCardImage";
import { Stack, Typography } from "@mui/material";
import "./index.css";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    type: "Cities",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    type: "Animals",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
    type: "Technology",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    type: "Countries",
  },
];

function CarouselImage() {
  return (
    <>
      <Carousel
        showArrows={true}
        autoPlay={true}
        showThumbs={false}
        showIndicators={true}
        stopOnHover={true}
      >
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.type}
            style={{ width: "100%", height: "400px" }}
          >
            <img src={image.imgPath} alt={image.type} />

            <ImageBackdrop className="MuiImageBackdrop-root" />

            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.type}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselImage;
