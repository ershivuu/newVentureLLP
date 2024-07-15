import React, { useEffect, useState } from "react";
import {
  upcommingPageBannerData,
  upcommingPageBannerImage,
  getUpcommingProjects,
} from "../../Services/frontendServices";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import "./Projects.css";
import vectorOne from "../../assets/images/vector-imgs/site-3.jpg";
import vectorTwo from "../../assets/images/vector-imgs/site-4.jpg";
import sidVideo from "../../assets/videos/sitevideo.mp4";
function Projects() {
  const [projects, setProjects] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [contentData, setContentData] = useState([]);

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
  const getProjects = async () => {
    try {
      const data = await getUpcommingProjects();
      setContentData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getBanner();
    getProjects();
  }, []);
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div className="page-heading" key={project.id}>
                <p>{project.heading}</p>
              </div>
            ))
          ) : (
            // content if api is not working
            <div className="page-heading">
              <p>Upcomming Projects</p>
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
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              // content if api is not working
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active carousel-item-banner">
                    <img
                      src={vectorOne}
                      class="d-block w-100"
                      alt="..."
                      loading="lazy"
                    />
                  </div>
                  <div class="carousel-item carousel-item-banner">
                    <img
                      src={vectorTwo}
                      class="d-block w-100"
                      alt="..."
                      loading="lazy"
                    />
                  </div>
                </div>
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
            </>
          )}
        </div>
      </div>

      <div>
        {contentData.length > 0 ? (
          contentData.map((contentItem) => (
            <div className="about-project" key={contentItem.content_video_id}>
              <div className="project-imgs">
                <div
                  id={`carouselExample${contentItem.content_video_id}`}
                  className="carousel slide"
                >
                  <div className="carousel-inner">
                    {contentItem.slider_images.map((image, index) => (
                      <div
                        key={image.id}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        } carousel-item-project`}
                      >
                        <img
                          src={image.slider_img_path}
                          className="d-block w-100"
                          alt={image.file_name}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carouselExample${contentItem.content_video_id}`}
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon projects-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carouselExample${contentItem.content_video_id}`}
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon projects-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="content">
                <div className="project-content">
                  <p>{contentItem.heading}</p>
                  <p>{contentItem.content}</p>
                </div>
                <div className="video-section">
                  <iframe
                    width="560"
                    height="315"
                    src={contentItem.video_link}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          ))
        ) : (
          // content if api is not working
          <div className="about-project">
            <div className="project-imgs">
              <div id="carouselExampleDummy" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active carousel-item-project">
                    <img
                      src={vectorOne}
                      class="d-block w-100"
                      alt="..."
                      loading="lazy"
                    />
                  </div>
                  <div class="carousel-item carousel-item-project">
                    <img
                      src={vectorTwo}
                      class="d-block w-100"
                      alt="..."
                      loading="lazy"
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDummy"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon  projects-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDummy"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon projects-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            <div className="content">
              <div className="project-content">
                <p>Shiddhraj Paradise</p>
                <p>
                  Siddhraj Paradise, a prestigious residential closed colony
                  nestled in the serene locale of Sinhasa, Indore, is a
                  testament to luxurious and tranquil living. Located in close
                  proximity to the Indore International Airport, this
                  meticulously planned enclave offers a range of plots spanning
                  from 1200 to 2800 sqft, providing ample space for your dream
                  home.
                </p>
              </div>
              <div className="video-section">
                <video
                  src={sidVideo}
                  autoPlay
                  muted
                  loop
                  controls=" true"
                ></video>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footers></Footers>
    </>
  );
}

export default Projects;
