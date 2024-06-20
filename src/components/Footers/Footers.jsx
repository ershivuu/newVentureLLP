import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Footers.css"; // Import CSS file after JS imports
import logo from "../../assets/logos/logo.png";

function Footers() {
  const phoneNumber = "+91 96172-44330";
  return (
    <>
      <div className="footer-wrapper">
        <div className="inner-wrapper">
          <div className="venture-logo">
            <img src={logo} alt="" />
          </div>
          <div className="email">
            <form>
              <p>Join Our List</p>
              <input type="email" placeholder="Your Email" />
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
