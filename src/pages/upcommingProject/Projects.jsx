import React from "react";
import "./Projects.css";
import siteimg1 from "../../assets/images/vector-imgs/site-1.jpg";
import siteimg2 from "../../assets/images/vector-imgs/site-2.jpg";
import siteimg3 from "../../assets/images/vector-imgs/site-3.jpg";

function Projects() {
  return (
    <>
      <div className="wrapper">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={siteimg1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={siteimg2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={siteimg3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Projects;
