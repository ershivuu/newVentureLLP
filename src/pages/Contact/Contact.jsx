import React, { useEffect, useState } from "react";
import { getContactPageData } from "../../Services/frontendServices";
import "./Contact.css";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
import facebookLogo from "../../assets/logos/facebook-black.png";
import instagramLogo from "../../assets/logos/instagram-black.png";
import twitterLogo from "../../assets/logos/twitter-black.png";
import youtubeLogo from "../../assets/logos/youtube-black.png";
function Contact() {
  const dummyData = {
    id: 0,
    heading: "Contact",
    banner_img: banner,
    email: "email@corusview.com",
    phone: "+91 96172-44330",
  };
  const [contactData, setContactData] = useState(dummyData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactPageData();
      if (data) {
        setContactData(data);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="single-banner">
          <div className="single-banner-image">
            <img src={contactData.banner_img} alt="Banner" />
            <div className="colored-overlay"></div>
            <div className="single-banner-heading">
              <p>{contactData.heading}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-details">
        <div>
          <p>Write with us</p>
          <p>
            <a href={`mailto:${contactData.email}`}>{contactData.email} →</a>
          </p>
        </div>
        <div>
          <p>Talk with us</p>
          <p>
            <a href={`tel:+91${contactData.phone}`}>+91 {contactData.phone}</a>
          </p>
        </div>
      </div>
      <div className="contect-us">
        <p>Connect with us</p>
        <div className="social-icons">
          <div>
            <a href="" target="_blank">
              <img src={facebookLogo} alt="" />
            </a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/corusviewventure/?igsh=MXZvd2c1Z251Y2p6eg%3D%3D"
              target="_blank"
            >
              <img src={instagramLogo} alt="" />
            </a>
          </div>
          <div>
            <a href="" target="_blank">
              <img src={twitterLogo} alt="" />
            </a>
          </div>
          <div>
            <a href="" target="_blank"></a>
            <img src={youtubeLogo} alt="" />
          </div>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Contact;
