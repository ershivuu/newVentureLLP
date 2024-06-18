import React from "react";
import "./Projects.css";
import siteimg1 from "../../assets/images/vector-imgs/site-1.jpg";
import siteimg2 from "../../assets/images/vector-imgs/site-2.jpg";
import siteimg3 from "../../assets/images/vector-imgs/site-3.jpg";
import siteVideo from "../../assets/videos/sitevideo.mp4";

function Projects() {
  return (
    <>
      <div className="wrapper">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item  carousel-item-banner active">
              <img src={siteimg1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item carousel-item-banner">
              <img src={siteimg2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item carousel-item-banner">
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
      <div className="about-project">
        <div className="project-imgs">
          <div id="carouselExample1" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item  carousel-item-project active">
                <img src={siteimg1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item carousel-item-project">
                <img src={siteimg2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item carousel-item-project">
                <img src={siteimg3} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample1"
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
              data-bs-target="#carouselExample1"
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
        <div className="content">
          <div className="project-content">
            <p>Siddhraj Paradise</p>
            <p>
              Siddhraj Paradise, a prestigious residential closed colony nestled
              in the serene locale of Sinhasa, Indore, is a testament to
              luxurious and tranquil living. Located in close proximity to the
              Indore International Airport, this meticulously planned enclave
              offers a range of plots spanning from 1200 to 2800 sqft, providing
              ample space for your dream home.
            </p>
          </div>
          <div className="video-section">
            <video autoPlay muted loop controls="true" src={siteVideo}></video>
          </div>
        </div>
      </div>
    </>
  );
}

export default Projects;
