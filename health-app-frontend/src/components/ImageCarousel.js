import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageCarousel.css";

import image1 from "../assets/images/carousel-1.jpeg";
import image2 from "../assets/images/carousel-2.jpg";
import image3 from "../assets/images/carousel-3.jpg";

function ImageCarousel() {
  return (
    <div className="carousel-container">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={4000}
        // --- ADD THESE TWO PROPS for custom arrows ---
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="arrow arrow-prev"
            >
              &#10094;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="arrow arrow-next"
            >
              &#10095;
            </button>
          )
        }
      >
        <div>
          <img src={image1} alt="Breast cancer awareness ribbon" />
          <p className="legend">Early Detection Saves Lives</p>
        </div>
        <div>
          <img src={image2} alt="Healthy food" />
          <p className="legend">A Healthy Lifestyle Reduces Risk</p>
        </div>
        <div>
          <img src={image3} alt="Doctor consulting patient" />
          <p className="legend">Know the Facts, Not the Myths</p>
        </div>
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
