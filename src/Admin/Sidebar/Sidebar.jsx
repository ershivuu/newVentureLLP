import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isOpen }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [footerDropdownOpen, setFooterDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [nriDropdownOpen, setNriDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleHomeDropdown = () => {
    setHomeDropdownOpen(!homeDropdownOpen);
  };

  const handleAboutDropdown = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };
  const handleFooterDropdown = () => {
    setFooterDropdownOpen(!footerDropdownOpen);
  };

  const handleNriDropdown = () => {
    // Function to toggle NRI Corner dropdown
    setNriDropdownOpen(!nriDropdownOpen);
  };
  const handleGalleryDropdown = () => {
    setGalleryDropdownOpen(!galleryDropdownOpen);
  };
  const handleContactDropdown = () => {
    setContactDropdownOpen(!contactDropdownOpen);
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setHomeDropdownOpen(false);
    setAboutDropdownOpen(false);
    setNriDropdownOpen(false);
    setAboutDropdownOpen(false);
    setFooterDropdownOpen(false);
    setGalleryDropdownOpen(false);
    setContactDropdownOpen(false);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              <button className="dropdown-btn" onClick={handleHomeDropdown}>
                Home
                <span className="custom-btn">
                  {homeDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  homeDropdownOpen ? "active" : ""
                }`}
              >
                <Link to="/adminpanel/edithome" onClick={handleLinkClick}>
                  <a>Edit Banner</a>
                </Link>
                <Link to="/adminpanel/homesection2" onClick={handleLinkClick}>
                  <a>Edit Slider</a>
                </Link>
                <Link to="/adminpanel/homesection1" onClick={handleLinkClick}>
                  <a>About Section</a>
                </Link>
                <Link to="/adminpanel/homesection3" onClick={handleLinkClick}>
                  <a>Testimonial Section</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleAboutDropdown}>
                About
                <span className="custom-btn">
                  {aboutDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  aboutDropdownOpen ? "active" : ""
                }`}
                style={{ display: aboutDropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/aboutbanner" onClick={handleLinkClick}>
                  <a>Edit Banner</a>
                </Link>
                <Link to="/adminpanel/aboutsection1" onClick={handleLinkClick}>
                  <a>About Section</a>
                </Link>
                <Link to="/adminpanel/aboutsection2" onClick={handleLinkClick}>
                  <a>Mission & Vision</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleGalleryDropdown}>
                Gallery
                <span className="custom-btn">
                  {galleryDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container ${
                  galleryDropdownOpen ? "active" : ""
                }`}
                style={{ display: galleryDropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/gallerybanner" onClick={handleLinkClick}>
                  Edit Banner
                </Link>
                <Link to="/adminpanel/gallerydata" onClick={handleLinkClick}>
                  Create Project
                </Link>
                <Link to="/adminpanel/galleryheading" onClick={handleLinkClick}>
                  Edit Project Name
                </Link>
                <Link
                  to="/adminpanel/gallerycontainer2"
                  onClick={handleLinkClick}
                >
                  Site Images
                </Link>
                <Link
                  to="/adminpanel/gallerycontainer1"
                  onClick={handleLinkClick}
                >
                  Real Site Images
                </Link>
              </div>

              <button className="dropdown-btn" onClick={handleNriDropdown}>
                NRI Corner
                <span className="custom-btn">
                  {nriDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  nriDropdownOpen ? "active" : ""
                }`}
                style={{ display: nriDropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/nribanner" onClick={handleLinkClick}>
                  <a>Edit Banner & Content</a>
                </Link>
                <Link to="/adminpanel/contactdetails" onClick={handleLinkClick}>
                  <a>Contact Details</a>
                </Link>
              </div>

              {/* --------------------------------------------------------------------------- */}
              <button className="dropdown-btn" onClick={handleContactDropdown}>
                Contact Page
                <span className="custom-btn">
                  {contactDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  contactDropdownOpen ? "active" : ""
                }`}
                style={{ display: contactDropdownOpen ? "block" : "none" }}
              >
                <Link
                  className="dropdown-btn"
                  to="/adminpanel/editcontactus"
                  onClick={handleLinkClick}
                >
                  <a>Edit Contact Page</a>
                </Link>
                <Link to="/adminpanel/contactform" onClick={handleLinkClick}>
                  <a>Contact Form Data</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleDropdown}>
                Upcoming Projects
                <span className="custom-btn">{dropdownOpen ? "-" : "+"}</span>
              </button>
              <div
                className={`dropdown-container  ${
                  dropdownOpen ? "active" : ""
                }`}
                style={{ display: dropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/pageheading" onClick={handleLinkClick}>
                  <a href="#">Edit Heading</a>
                </Link>
                <Link to="/adminpanel/bannerimages" onClick={handleLinkClick}>
                  <a href="#">Edit Banner</a>
                </Link>
                <Link to="/adminpanel/slidercontent" onClick={handleLinkClick}>
                  <a href="#">Create Project</a>
                </Link>
                <Link to="/adminpanel/projectslider" onClick={handleLinkClick}>
                  <a href="#">Project Images</a>
                </Link>
              </div>
              <button className="dropdown-btn" onClick={handleFooterDropdown}>
                Footer
                <span className="custom-btn">
                  {footerDropdownOpen ? "-" : "+"}
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  footerDropdownOpen ? "active" : ""
                }`}
                style={{ display: footerDropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/footerdata" onClick={handleLinkClick}>
                  <a>Footer Data</a>
                </Link>
                <Link to="/adminpanel/editfooter" onClick={handleLinkClick}>
                  <a>Edit Footer</a>
                </Link>
              </div>
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

export default Sidebar;
