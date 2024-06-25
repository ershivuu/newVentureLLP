import React, { useEffect, useState } from "react";
import "./Gallery.css";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
import home2 from "../../assets/images/home2.jpg";
import home3 from "../../assets/images/home3.jpg";
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
      <div className="prjoect-gallery">
        <div className="project-name">
          <p> Shiddhraj Paradise</p>
        </div>
        <div className="image-group image-group-1">
          <div className="group-1-heading">
            <p>Front-view</p>
          </div>
          <div className="image-section">
            <img src={home2} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
        </div>
        <div className="image-group image-group-1">
          <div className="group-1-heading">
            <p>Top view</p>
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
          <div className="image-section">
            <img src={home3} alt="" srcset="" />
          </div>
        </div>
      </div>

      <Footers></Footers>
    </>
  );
}

export default Gallery;
