import React, { useState, useEffect, useRef } from "react";
import {
  aboutPageBannerData,
  aboutPageBannerImage,
  getAboutUsSectionFirst,
  getAboutSectionTwo,
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
  const [aboutUsData, setAboutUsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [missionData, setMissionData] = useState(null);

  const aboutUsRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  const getBanner = async () => {
    try {
      const projectsData = await aboutPageBannerData();
      setProjects(projectsData);
      const bannerImagesData = await aboutPageBannerImage();
      setBannerImages(bannerImagesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAboutUsData = async () => {
    try {
      const data = await getAboutUsSectionFirst();
      setAboutUsData(data);
    } catch (error) {
      console.error("Error fetching About Us section data:", error);
      setAboutUsData(null); // Reset data on error
    } finally {
      setIsLoading(false);
    }
  };
  const getSectionTwo = async () => {
    const data = await getAboutSectionTwo();
    setMissionData(data);
  };
  useEffect(() => {
    getBanner();
    getAboutUsData();
    getSectionTwo();
  }, []);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div>
          {projects.length > 0 ? (
            <div className="about-page-heading" key={projects[0].id}>
              <p>{projects[0].heading}</p>
            </div>
          ) : (
            <div className="about-page-heading">
              <p>About Us</p>
            </div>
          )}
        </div>

        <div id="carouselExample" className="carousel slide">
          <div className="gradient-overlay"></div>
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
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active carousel-item-banner">
                    <img src={vectorOne} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item carousel-item-banner">
                    <img src={vectorTwo} className="d-block w-100" alt="..." />
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
      <div className="sub-header">
        <div onClick={() => scrollToSection(aboutUsRef)}>
          <p>About Us</p>
        </div>
        <div onClick={() => scrollToSection(missionRef)}>
          <p>Mission</p>
        </div>
        <div onClick={() => scrollToSection(visionRef)}>
          <p>Vision</p>
        </div>
      </div>
      <div ref={aboutUsRef} className="about-section">
        {isLoading ? (
          <p>Loading...</p>
        ) : aboutUsData ? (
          <>
            <div className="about-content">
              <p>{aboutUsData.heading}</p>
              <p>{aboutUsData.content}</p>
            </div>
            <div className="about-imgs">
              <div className="vert-img">
                <img
                  src={aboutUsData.img_first}
                  alt={aboutUsData.img_first_originalname}
                />
              </div>
              <div className="horizontal-group">
                <div className="hor-group-img-1">
                  <img
                    src={aboutUsData.img_second}
                    alt={aboutUsData.img_second_originalname}
                  />
                </div>
                <div className="hor-group-img-2">
                  <img
                    src={aboutUsData.img_third}
                    alt={aboutUsData.img_third_originalname}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          // Fallback content if API call fails or returns no data
          <>
            <div className="about-content">
              <p>About Corusview Venture LLP</p>
              <p>
                Corusview Venture LLP is a real estate firm dedicated to raising
                the bar for excellence in the sector. We take great pride in our
                constant dedication to quality, creativity, and client
                happiness. Our company was founded with the goal of transforming
                environments and elevating lifestyles. In every aspect of real
                estate development, Corusview Venture LLP is a reputable name
                that is synonymous with excellence, honesty, and integrity
                thanks to its team of seasoned professionals and extensive
                portfolio of successful projects.
              </p>
            </div>
            <div className="about-imgs">
              <div className="vert-img">
                <img src={home1} alt="Default image 1" />
              </div>
              <div className="horizontal-group">
                <div className="hor-group-img-1">
                  <img src={home2} alt="Default image 2" />
                </div>
                <div className="hor-group-img-2">
                  <img src={home3} alt="Default image 3" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div ref={missionRef}>
        {missionData ? (
          <div className="mission">
            <div className="mission-content">
              <p>{missionData.content_first}</p>
            </div>
            <div className="mission-heading">
              <p>{missionData.heading_first}</p>
            </div>
          </div>
        ) : (
          <div className="mission">
            <div className="mission-content">
              <p>
                At Corusview Venture LLP, our goal is to constantly surpass our
                clients' expectations by providing outstanding real estate
                solutions. Driven by the values of honesty, competence, and
                customer-first mentality, we are committed to generating value
                for all of the people we serve. Our intentions are to maintain
                moral corporate conduct, build long-lasting connections, and
                make a significant impact on the communities we serve. Our
                mission is to be known as a trendsetter in the real estate
                industry, turning aspirations into reality one project at a
                time, by means of an uncompromising pursuit of excellence.
              </p>
            </div>
            <div className="mission-heading">
              <p>Our Mission</p>
            </div>
          </div>
        )}
      </div>

      <div ref={visionRef}>
        {missionData ? (
          <div className="vision">
            <div className="vision-content">
              <p>{missionData.content_second}</p>
            </div>
            <div className="vision-heading">
              <p>{missionData.heading_second}</p>
            </div>
          </div>
        ) : (
          <div className="vision">
            <div className="vision-content">
              <p>
                At Corusview Venture LLP, our goal is to constantly surpass our
                clients' expectations by providing outstanding real estate
                solutions. Driven by the values of honesty, competence, and
                customer-first mentality, we are committed to generating value
                for all of the people we serve. Our intentions are to maintain
                moral corporate conduct, build long-lasting connections, and
                make a significant impact on the communities we serve. Our
                mission is to be known as a trendsetter in the real estate
                industry, turning aspirations into reality one project at a
                time, by means of an uncompromising pursuit of excellence.
              </p>
            </div>
            <div className="vision-heading">
              <p>Our Mission</p>
            </div>
          </div>
        )}
      </div>
      <Footers></Footers>
    </>
  );
}

export default About;
