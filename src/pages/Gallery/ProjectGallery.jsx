import React, { useState, useEffect } from "react";
import "./Gallery.css";
import home2 from "../../assets/images/home2.jpg";
import home3 from "../../assets/images/home3.jpg";
import { getAllGalleryImages } from "../../Services/frontendServices";

function ProjectGallery() {
  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const fetchData = async () => {
    try {
      const data = await getAllGalleryImages();
      setGalleryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading status to false whether successful or not
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    // Placeholder content while loading
    return <div>Loading...</div>;
  }

  if (galleryData.length === 0) {
    // Dummy project when no data is available
    return (
      <div className="project-gallery">
        <div className="project-name">
          <p>Siddhraj Paradise</p>
        </div>
        <div className="image-group image-group-1">
          <div className="group-1-heading">
            <p>Front-view</p>
          </div>
          <div className="image-section-container">
            <div className="image-section">
              <img src={home2} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={home2} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={home2} alt="siddhraj Paradise" />
            </div>
          </div>
        </div>
        <div className="image-group image-group-2">
          <div className="group-1-heading">
            <p>Top view</p>
          </div>
          <div className="image-section-container">
            <div className="image-section">
              <img src={home2} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={home2} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={home2} alt="siddhraj Paradise" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {galleryData.map((project, index) => (
        <div className="project-gallery" key={index}>
          <div className="project-name">
            <p>{project.main_heading}</p>
          </div>
          <div className="image-group image-group-1">
            <div className="group-1-heading">
              <p>Front-view</p>
            </div>
            <div className="image-section-container">
              {project.container1_image.map((image, idx) => (
                <div className="image-section" key={idx}>
                  <img src={image.img1} alt={`Front view ${idx}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="image-group image-group-2">
            <div className="group-1-heading">
              <p>Top view</p>
            </div>
            <div className="image-section-container">
              {project.container2_image.map((image, idx) => (
                <div className="image-section" key={idx}>
                  <img src={image.img2} alt={`Top view ${idx}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProjectGallery;
