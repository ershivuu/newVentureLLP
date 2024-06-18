import React, { useEffect, useState } from "react";
import axios from "axios";
import Headers from "../../components/Headers/Headers";
import { projectPageBanner } from "../../Services/frontendServices";

function Gallery() {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.29.110:5000/getAllSectionFirst"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id}>
                <p>{project.heading}</p>
                <div className="banner-images">
                  {project.banner_images &&
                    project.banner_images.map((image) => (
                      <img
                        key={image.id}
                        src={image.img_path}
                        alt={image.img_name}
                      />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Gallery;
