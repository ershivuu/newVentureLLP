import React, { useEffect, useState, useMemo } from "react";
import "./Gallery.css";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import defaultBanner from "../../assets/images/vector-imgs/site-3.jpg";
import ProjectGallery from "./ProjectGallery";
import { getGalleryBanner } from "../../Services/frontendServices";

function Gallery() {
  const [banner, setBanner] = useState({
    banner_img_url: defaultBanner,
    heading: "Gallery",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getGalleryBanner();
        setBanner(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  const bannerContent = useMemo(() => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <img src={defaultBanner} alt="Default Banner" />;
    }
    return <img src={banner.banner_img_url} alt="Banner" />;
  }, [loading, error, banner.banner_img_url]);

  return (
    <>
      <Headers />
      <div className="wrapper">
        <div className="single-banner">
          <div className="single-banner-image">
            {bannerContent}
            <div className="colored-overlay"></div>
            <div className="single-banner-heading">
              <p>{banner.heading}</p>
            </div>
          </div>
        </div>
      </div>
      <ProjectGallery />
      <Footers />
    </>
  );
}

export default Gallery;
