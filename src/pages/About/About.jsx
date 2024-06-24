import React, { useEffect, useState } from "react";
import {
  upcommingPageBannerData,
  upcommingPageBannerImage,
} from "../../Services/frontendServices";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import "./About.css";
import vectorOne from "../../assets/images/vector-imgs/site-3.jpg";
import vectorTwo from "../../assets/images/vector-imgs/site-4.jpg";
import home1 from "../../assets/images/home1.jpg";
import home2 from "../../assets/images/home2.jpg";
import home3 from "../../assets/images/home3.jpg";

function About() {
  const [projects, setProjects] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const getBanner = async () => {
    try {
      const projectsData = await upcommingPageBannerData();
      setProjects(projectsData);

      const bannerImagesData = await upcommingPageBannerImage();
      setBannerImages(bannerImagesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div className="about-page-heading" key={project.id}>
                <p>{project.heading}</p>
              </div>
            ))
          ) : (
            // content if api is not working
            <div className="about-page-heading">
              <p>About Us</p>
            </div>
          )}
        </div>

        <div id="carouselExample" className="carousel slide">
          <div class="gradient-overlay"></div>
          <div className="carousel-inner">
            {bannerImages.length > 0 ? (
              bannerImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`carousel-item ${
                    index === 0 ? "active" : ""
                  } carousel-item-banner`}
                >
                  <img
                    src={image.img_path}
                    className="d-block w-100"
                    alt={image.img_name}
                  />
                </div>
              ))
            ) : (
              // content if api is not working
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active carousel-item-banner">
                    <img src={vectorOne} class="d-block w-100" alt="..." />
                  </div>
                  <div class="carousel-item carousel-item-banner">
                    <img src={vectorTwo} class="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon abt-page-prev-btn"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon abt-page-next-btn"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            )}
          </div>
          {bannerImages.length > 0 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon abt-page-prev-btn"
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
                  className="carousel-control-next-icon abt-page-next-btn"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="about-section">
        <div className="about-content">
          <p>About Corusview Venture LLP</p>
          <p>
            Corusview Venture LLP is a real estate firm dedicated to raising the
            bar for excellence in the sector. We take great pride in our
            constant dedication to quality, creativity, and client happiness.
            Our company was founded with the goal of transforming environments
            and elevating lifestyles. In every aspect of real estate
            development, Corusview Venture LLP is a reputable name that is
            synonymous with excellence, honesty, and integrity thanks to its
            team of seasoned professionals and extensive portfolio of successful
            projects.
          </p>
        </div>
        <div className="about-imgs">
          <div className="vert-img">
            <img src={home1} alt="" />
          </div>
          <div className="horizontal-group">
            <div className="hor-group-img-1">
              <img src={home2} alt="" />
            </div>
            <div className="hor-group-img-2">
              <img src={home3} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mission">
        <div className="mission-content">
          <p>
            At Corusview Venture LLP, our goal is to constantly surpass our
            clients' expectations by providing outstanding real estate
            solutions. Driven by the values of honesty, competence, and
            customer-first mentality, we are committed to generating value for
            all of the people we serve. Our intentions are to maintain moral
            corporate conduct, build long-lasting connections, and make a
            significant impact on the communities we serve. Our mission is to be
            known as a trendsetter in the real estate industry, turning
            aspirations into reality one project at a time, by means of an
            uncompromising pursuit of excellence.
          </p>
        </div>
        <div className="mission-heading">
          <p>Our Mission</p>
        </div>
      </div>
      <div className="vision">
        <div className="vision-content">
          <p>
            At Corusview Venture LLP, we strive to create living experiences
            that are in line with our clients' dreams in addition to developing
            structures. Our vision is to lead the way in innovative
            architectural and design practises, establishing thriving and
            sustainable communities that foster a sense of community. Our vision
            is to create a lasting impact on the urban landscape, redefine the
            future of real estate, and set new standards for unmatched
            excellence by utilising innovation and adapting to changing market
            conditions.
          </p>
        </div>
        <div className="vision-heading">
          <p>Our Vision</p>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default About;
