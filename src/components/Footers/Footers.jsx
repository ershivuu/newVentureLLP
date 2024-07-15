import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Footers.css"; // Import CSS file after JS imports
import logo from "../../assets/logos/logo.png";
import mailicon from "../../assets/logos/mail.png";
import { submitEmail, getFooterData } from "../../Services/frontendServices";
import Notification from "../../Notification/Notification"; // Adjust the path based on your project structure

function Footers() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [footerColor, setFooterColor] = useState("");
  const [email, setEmail] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // Function to show notifications
  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const getFooterInfo = async () => {
    try {
      const data = await getFooterData();
      if (data && data.mobile) {
        setPhoneNumber(data.mobile);
      } else {
        setPhoneNumber("+91 9617244330");
      }
      setFooterColor(
        data.footer_color ||
          "radial-gradient(150.55% 150.55% at 50% 50%, #004c3f 0%, #000000 100%)"
      );
    } catch (error) {
      console.error("Error fetching footer data:", error);
      setPhoneNumber("+91 9617244330");
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
      showNotification("Email submitted successfully", "success");
    } catch (error) {
      console.error("Error submitting email:", error);
      showNotification("Failed to submit email. Please try again.", "error");
    }
  };

  return (
    <>
      <div
        className="footer-wrapper"
        style={{
          background: footerColor || "#004337",
        }}
      >
        <div className="inner-wrapper">
          <div className="venture-logo">
            <img src={logo} alt="" />
          </div>
          <div className="email">
            <p>Join Our List</p>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  className="submit-btn"
                  type="submit"
                  style={{ backgroundColor: footerColor }}
                >
                  <img src={mailicon} alt="Submit" />
                </button>
              </div>
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
            <p>
              Copyright&#169;2024, All rights reserved Corusview Venture LLP
            </p>
          </div>
          <div></div>
          <div>
            <p>Designed & Developed By CorusView</p>
          </div>
          <div></div>
          <div>
            <p>
              <a href="/privacy-policy">Privacy Policy | Terms of Use Apply</a>
            </p>
          </div>
        </div>
      </div>

      {/* Notification Component */}
      <Notification
        open={notificationOpen}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
}

export default Footers;
