import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import bannerHomeStatic from "../../assets/images/vector-imgs/siddhraj.jpg";
import siteimg1 from "../../assets/images/vector-imgs/site-1.jpg";
import siteimg2 from "../../assets/images/vector-imgs/site-2.jpg";
import siteimg3 from "../../assets/images/vector-imgs/site-5.jpg";
import venture1 from "../../assets/images/siteimgs/Picture1.jpg";
import venture2 from "../../assets/images/siteimgs/Picture2.jpg";
import venture3 from "../../assets/images/siteimgs/Picture3.jpg";
import {
  getBanner,
  getHomeSectionFirstData,
  getHomeSlider,
  getHomeSectionThree,
} from "../../Services/frontendServices";
function Home() {
  const [loading, setLoading] = useState(true);
  const [bannerHome, setBannerHome] = useState("");
  const [images, setImages] = useState([]);
  const [homeSectionData, setHomeSectionData] = useState({
    heading: "Welcome to the VENTURE LLP experience",
    content:
      "Corusview Venture LLP is a real estate firm dedicated to raising the bar for excellence in the sector. We take great pride in our constant dedication to quality, creativity, and client happiness. Our company was founded with the goal of transforming environments and elevating lifestyles. In every aspect of real estate development, Corusview Venture LLP is a reputable name that is synonymous with excellence, honesty, and integrity thanks to its team of seasoned professionals and extensive portfolio of successful projects.",
    img_first: siteimg1,
    img_second: siteimg2,
    img_third: siteimg3,
  });
  const [homeSectionThree, setHomeSectionThree] = useState({
    content:
      "You and team went above and beyond! Thank y'all so much for the commitment to excellence- the results speak for themselves.",
    sectionthird_img_first: siteimg1,
    sectionthird_img_second: siteimg2,
    sectionthird_img_third: siteimg3,
  });
  const getBannerData = async () => {
    try {
      const data = await getBanner();
      setBannerHome(data.banner_img_path);
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };
  const getSectionOne = async () => {
    try {
      const data = await getHomeSectionFirstData();
      setHomeSectionData(data);
    } catch (error) {
      console.error("Error fetching home section data:", error);
    }
  };
  const fetchSliderImages = async () => {
    try {
      const data = await getHomeSlider();
      setImages(data);
    } catch (error) {
      console.error("Error fetching slider images:", error);
    } finally {
      setLoading(false);
    }
  };
  const getSectionThree = async () => {
    try {
      const sectionthree = await getHomeSectionThree();
      setHomeSectionThree(sectionthree);
    } catch (error) {
      console.error("Error fetching home section data:", error);
    }
  };
  useEffect(() => {
    getBannerData();
    getSectionOne();
    fetchSliderImages();
    getSectionThree();
  }, []);

  const { heading, content, img_first, img_second, img_third } =
    homeSectionData;
  const dummyImages = [
    {
      id: 1,
      slider_img_path: venture1,
      original_name: "Site-1",
    },
    {
      id: 2,
      slider_img_path: venture2,
      original_name: "Site-2",
    },
    {
      id: 3,
      slider_img_path: venture3,
      original_name: "Site-3",
    },
  ];
  return (
    <>
      <Headers></Headers>
      <div className="wrapper home-page">
        <div className="banner-home">
          {bannerHome ? (
            <img src={bannerHome} alt="Banner" loading="lazy" />
          ) : (
            <div className="banner-home-static">
              <img src={bannerHomeStatic} alt="" loading="lazy" />
            </div>
          )}
        </div>
      </div>
      <div className="welcome-section">
        <div className="welcome-content">
          <p>{heading}</p>
          <p>{content}</p>

          <div className="view-btn">
            <button>
              <Link to="/about">View About Us</Link>
            </button>
          </div>
        </div>
        <div className="welcome-imgs">
          <div className="portrait-img">
            <img src={img_first} alt="First" loading="lazy" />
          </div>
          <div className="landscape-img">
            <div className="landscape-img-1">
              <img src={img_second} alt="Second" loading="lazy" />
            </div>
            <div className="landscape-img-2">
              <img src={img_third} alt="Third" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      <div className="slider-section-heading">
        <p>Explore Our Venture</p>
      </div>
      <div className="home-slider">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {loading ? (
              <p>Loading...</p>
            ) : images.length > 0 ? (
              images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === 0 ? "active" : ""
                  } carousel-item-home`}
                >
                  <img
                    src={image.slider_img_path}
                    className="d-block w-100"
                    alt={image.original_name}
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              dummyImages.map((dummyImage, index) => (
                <div
                  key={index}
                  className={`carousel-item ${
                    index === 0 ? "active" : ""
                  } carousel-item-home`}
                >
                  <img
                    src={dummyImage.slider_img_path}
                    className="d-block w-100"
                    alt={dummyImage.original_name}
                    loading="lazy"
                  />
                </div>
              ))
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
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
            data-bs-target="#carouselExampleAutoplaying"
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
      <div className="gallery-btn">
        <button>
          <Link to="/gallery">View Gallery</Link>
        </button>
      </div>
      {/* ------------------------------------------------------------- */}
      <div className="testimonial-section">
        <div className="testimonial-content">
          <p>
            <span>"</span>
            {homeSectionThree.content}
            <span>"</span>
          </p>

          <div className="view-btn">
            <button>
              <Link to="/projects">View Testimonial</Link>
            </button>
          </div>
        </div>
        <div className="welcome-imgs">
          <div className="portrait-img">
            <img
              src={homeSectionThree.sectionthird_img_first}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="landscape-img">
            <div className="landscape-img-1">
              <img
                src={homeSectionThree.sectionthird_img_second}
                alt=""
                loading="lazy"
              />
            </div>
            <div className="landscape-img-2">
              <img
                src={homeSectionThree.sectionthird_img_third}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Home;
