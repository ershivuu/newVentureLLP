import React, { useEffect, useState } from "react";
import { getContactPageData } from "../../Services/frontendServices";
import { addContactFormData } from "../../Services/frontendServices";

import "./Contact.css";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
import facebookLogo from "../../assets/logos/facebook-black.png";
import instagramLogo from "../../assets/logos/instagram-black.png";
import twitterLogo from "../../assets/logos/twitter-black.png";
import youtubeLogo from "../../assets/logos/youtube-black.png";
function Contact() {
  const [bannerData, setBannerData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",

    comment: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dummyData = {
    id: 0,
    heading: "Contact",
    banner_img: banner,
    email: "email@corusview.com",
    phone: "+91 96172-44330",
  };
  const [contactData, setContactData] = useState(dummyData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContactFormData(formData);
      setFormSubmitted(true);
      setFormData({ name: "", phone: "", comment: "" });
    } catch (error) {
      alert("Internal server error!");
    }
  };
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
            <a href="" target="_blank"></a>
            <img src={youtubeLogo} alt="" />
          </div>
        </div>
      </div>

      <div className="nri-form">
        <p>Contact Us</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="phone"
              required
            />
          </div>
          <div>
            <input
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Comment"
              required
            />
          </div>
          <div className="submit-btns">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Contact;
