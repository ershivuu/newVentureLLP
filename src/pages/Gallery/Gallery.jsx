import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
function Gallery() {
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="single-banner">
          <div className="single-banner-image">
            <img src={banner} alt="" />
            <div className="colored-overlay"></div>
            <div className="single-banner-heading">
              <p>Gallery</p>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery-imgs">
        <div className="gallery-img-section-1">
          <div className="image-container"></div>
          <div className="image-container"></div>
          <div className="image-container"></div>
          <div className="image-container"></div>
        </div>
        <div className="gallery-img-section-2">
          <div className="sub-section-1">
            <div className="g-portrait-img image-container"></div>
            <div className="g-landscape-img image-container">
              <div className="image-container"></div>
              <div className="image-container"></div>
              <div className="image-container"></div>
            </div>
          </div>
          <div className="sub-section-2">
            <div className="big-landscape-image image-container"></div>
            <div className="section-2-child-container">
              <div className="image-container"></div>
              <div className="image-container"></div>
            </div>
          </div>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Gallery;
