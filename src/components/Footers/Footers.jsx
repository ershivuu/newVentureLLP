import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Footers.css"; // Import CSS file after JS imports
import logo from "../../assets/logos/logo.png";
import mailicon from "../../assets/logos/mail.png";
import { submitEmail, getFooterData } from "../../Services/frontendServices";

function Footers() {
  // const phoneNumber = "+91 96172-44330";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [footerColor, setFooterColor] = useState("");
  const [email, setEmail] = useState("");
  const getFooterInfo = async () => {
    try {
      const data = await getFooterData();
      setPhoneNumber(data.mobile);
      setFooterColor(data.footer_color);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };
  useEffect(() => {
    getFooterInfo();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await submitEmail(email);
      console.log("Email submitted successfully:", response);

      setEmail("");
      alert("Email submitted successfully");
    } catch (error) {
      console.error("Error submitting email:", error);

      alert("Failed to submit email. Please try again.");
    }
  };
  return (
    <>
      <div
        className="footer-wrapper"
        style={{
          background:
            footerColor ||
            "radial-gradient(150.55% 150.55% at 50% 50%, #004c3f 0%, #000000 100%)",
        }}
      >
        <div className="inner-wrapper">
          <div className="venture-logo">
            <img src={logo} alt="" />
          </div>
          <div className="email">
            <form onSubmit={handleSubmit}>
              <p>Join Our List</p>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                className="submit-btn"
                type="submit"
                style={{ backgroundColor: footerColor }}
              >
                <img src={mailicon} alt="Submit" />
              </button>
            </form>
          </div>

          <div className="phone-number">
            <p>Contact Us</p>
            <p>
              <a href={`tel:${phoneNumber.replace(/ /g, "")}`}>{phoneNumber}</a>
            </p>
          </div>
          <div className="social-links">
            <p className="link-heading">Social Media</p>
            <p>
              <a
                href="https://www.instagram.com/corusviewventure/?igsh=MXZvd2c1Z251Y2p6eg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <span>
                <FontAwesomeIcon className="fs-icons" icon={faArrowRight} />
              </span>
            </p>
            <p>
              <a href="" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <span>
                <FontAwesomeIcon className="fs-icons" icon={faArrowRight} />
              </span>
            </p>
            <p>
              <a href="" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <span>
                <FontAwesomeIcon className="fs-icons" icon={faArrowRight} />
              </span>
            </p>
            <p>
              <a href="" target="_blank" rel="noopener noreferrer">
                Youtube
              </a>
              <span>
                <FontAwesomeIcon className="fs-icons" icon={faArrowRight} />
              </span>
            </p>
          </div>
        </div>

        <div className="footer-wrapper-2">
          <div>
            <p>Copyright 2023. All rights reserved Corusview Venture LLP</p>
          </div>
          <div>
            <span>~</span>
          </div>
          <div>
            <p>Designed & Developed By CorusView</p>
          </div>
          <div>
            <span>~</span>
          </div>
          <div>
            <p>Privacy Policy Terms of Use Apply</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footers;
