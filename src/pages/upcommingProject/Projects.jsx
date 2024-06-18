import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchProjects,
  fetchBannerImages,
  fetchProject,
} from "../../Services/frontendServices";
import Headers from "../../components/Headers/Headers";
import "./Projects.css";
import siteimg1 from "../../assets/images/vector-imgs/site-1.jpg";
import siteimg2 from "../../assets/images/vector-imgs/site-2.jpg";
import siteimg3 from "../../assets/images/vector-imgs/site-3.jpg";
import siteVideo from "../../assets/videos/sitevideo.mp4";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [contentData, setContentData] = useState([]);

  const getBanner = async () => {
    try {
      const projectsData = await fetchProjects();
      setProjects(projectsData);

      const bannerImagesData = await fetchBannerImages();
      setBannerImages(bannerImagesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getProjects = async () => {
    try {
      const data = await fetchProject();
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
            <p>Please Wait...</p>
          )}
        </div>
        <div id="carouselExample" className="carousel slide">
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
              <p>Please Wait...</p>
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
      <div className="about-project">
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
                      className="carousel-control-prev-icon"
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
                      className="carousel-control-next-icon"
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
          <p>Please Wait...</p>
        )}
      </div>
    </>
  );
}

export default Projects;
