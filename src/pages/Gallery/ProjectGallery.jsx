import React, { useState, useEffect } from "react";
import "./Gallery.css";
import home2 from "../../assets/images/home2.jpg";
import venture1 from "../../assets/images/siteimgs/Picture1.jpg";
import venture2 from "../../assets/images/siteimgs/Picture2.jpg";
import venture3 from "../../assets/images/siteimgs/Picture3.jpg";
import venture4 from "../../assets/images/siteimgs/Picture4.jpg";
import venture5 from "../../assets/images/siteimgs/Picture5.jpg";
import venture6 from "../../assets/images/siteimgs/Picture6.jpg";
import venture7 from "../../assets/images/vector-imgs/siddhraj.jpg";
import venture8 from "../../assets/images/vector-imgs/site-1.jpg";
import venture9 from "../../assets/images/vector-imgs/site-2.jpg";
import venture10 from "../../assets/images/vector-imgs/site-3.jpg";
import venture11 from "../../assets/images/vector-imgs/site-4.jpg";
import venture12 from "../../assets/images/vector-imgs/site-5.jpg";
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
              <img src={venture1} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture2} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture3} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture4} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture5} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture6} alt="siddhraj Paradise" />
            </div>
          </div>
        </div>
        <div className="image-group image-group-2">
          <div className="group-1-heading">
            <p>Top view</p>
          </div>
          <div className="image-section-container">
            <div className="image-section">
              <img src={venture7} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture8} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture9} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture10} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture11} alt="siddhraj Paradise" />
            </div>
            <div className="image-section">
              <img src={venture12} alt="siddhraj Paradise" />
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
