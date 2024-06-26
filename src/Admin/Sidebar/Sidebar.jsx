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

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setHomeDropdownOpen(false);
    setAboutDropdownOpen(false);
    setNriDropdownOpen(false);
    setAboutDropdownOpen(false);
    setFooterDropdownOpen(false);
    setGalleryDropdownOpen(false);
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
                  <a>Home</a>
                </Link>
                <Link to="/adminpanel/homesection1" onClick={handleLinkClick}>
                  <a>Home Section 1</a>
                </Link>
                <Link to="/adminpanel/homesection2" onClick={handleLinkClick}>
                  <a>Home Section 2</a>
                </Link>
                <Link to="/adminpanel/homesection3" onClick={handleLinkClick}>
                  <a>Home Section 3</a>
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
                  <a>About Banner</a>
                </Link>
                <Link to="/adminpanel/aboutsection1" onClick={handleLinkClick}>
                  <a>About Section 1</a>
                </Link>
                <Link to="/adminpanel/aboutsection2" onClick={handleLinkClick}>
                  <a>About Section 2</a>
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
                  <a href="#">Page Heading </a>
                </Link>
                <Link to="/adminpanel/bannerimages" onClick={handleLinkClick}>
                  <a href="#">Banner Images </a>
                </Link>
                <Link to="/adminpanel/projectslider" onClick={handleLinkClick}>
                  <a href="#">Project Slider Images</a>
                </Link>
                <Link to="/adminpanel/slidercontent" onClick={handleLinkClick}>
                  <a href="#">Slider Content And Vedio</a>
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
                  <a>NRI Banner</a>
                </Link>
                <Link to="/adminpanel/contactdetails" onClick={handleLinkClick}>
                  <a>Contact Details</a>
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
                  Gallery Banner
                </Link>
                <Link to="/adminpanel/galleryheading" onClick={handleLinkClick}>
                  Gallery Heading
                </Link>
                <Link
                  to="/adminpanel/gallerycontainer1"
                  onClick={handleLinkClick}
                >
                  Gallery Image Container 1
                </Link>
                <Link
                  to="/adminpanel/gallerycontainer2"
                  onClick={handleLinkClick}
                >
                  Gallery Image Container 2
                </Link>
              </div>

              {/* --------------------------------------------------------------------------- */}
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
              <Link
                className="dropdown-btn"
                to="/adminpanel/editcontactus"
                onClick={handleLinkClick}
              >
                <a>Contact Us</a>
              </Link>
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

export default Sidebar;
