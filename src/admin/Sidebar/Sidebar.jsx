import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ isOpen }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null); // Close the dropdown if clicking again
    } else {
      setActiveDropdown(dropdownName); // Open the clicked dropdown
    }
  };

  const handleLinkClick = () => {
    setActiveDropdown(null); // Close all dropdowns when a link is clicked
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              {/* Home Dropdown */}
              <DropdownButton
                title="Home"
                isOpen={activeDropdown === "home"}
                onClick={() => handleDropdown("home")}
              >
                <Link to="/adminpanel/edithome" onClick={handleLinkClick}>
                  Edit Banner
                </Link>
                <Link to="/adminpanel/homesection2" onClick={handleLinkClick}>
                  Edit Slider
                </Link>
                <Link to="/adminpanel/homesection1" onClick={handleLinkClick}>
                  About Section
                </Link>
                <Link to="/adminpanel/homesection3" onClick={handleLinkClick}>
                  Testimonial Section
                </Link>
              </DropdownButton>

              {/* About Dropdown */}
              <DropdownButton
                title="About"
                isOpen={activeDropdown === "about"}
                onClick={() => handleDropdown("about")}
              >
                <Link to="/adminpanel/aboutbanner" onClick={handleLinkClick}>
                  Edit Banner
                </Link>
                <Link to="/adminpanel/aboutsection1" onClick={handleLinkClick}>
                  About Section
                </Link>
                <Link to="/adminpanel/aboutsection2" onClick={handleLinkClick}>
                  Mission & Vision
                </Link>
              </DropdownButton>

              {/* Gallery Dropdown */}
              <DropdownButton
                title="Gallery"
                isOpen={activeDropdown === "gallery"}
                onClick={() => handleDropdown("gallery")}
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
              </DropdownButton>

              {/* NRI Corner Dropdown */}
              <DropdownButton
                title="NRI Corner"
                isOpen={activeDropdown === "nri"}
                onClick={() => handleDropdown("nri")}
              >
                <Link to="/adminpanel/nribanner" onClick={handleLinkClick}>
                  Edit Banner & Content
                </Link>
                <Link to="/adminpanel/contactdetails" onClick={handleLinkClick}>
                  Contact Details
                </Link>
              </DropdownButton>

              {/* Contact Page Dropdown */}
              <DropdownButton
                title="Contact Page"
                isOpen={activeDropdown === "contact"}
                onClick={() => handleDropdown("contact")}
              >
                <Link to="/adminpanel/editcontactus" onClick={handleLinkClick}>
                  Edit Contact Page
                </Link>
                <Link to="/adminpanel/contactform" onClick={handleLinkClick}>
                  Contact Form Data
                </Link>
              </DropdownButton>

              {/* Upcoming Projects Dropdown */}
              <DropdownButton
                title="Upcoming Projects"
                isOpen={activeDropdown === "projects"}
                onClick={() => handleDropdown("projects")}
              >
                <Link to="/adminpanel/pageheading" onClick={handleLinkClick}>
                  Edit Heading
                </Link>
                <Link to="/adminpanel/bannerimages" onClick={handleLinkClick}>
                  Edit Banner
                </Link>
                <Link to="/adminpanel/slidercontent" onClick={handleLinkClick}>
                  Create Project
                </Link>
                <Link to="/adminpanel/projectslider" onClick={handleLinkClick}>
                  Project Images
                </Link>
              </DropdownButton>

              {/* Footer Dropdown */}
              <DropdownButton
                title="Footer"
                isOpen={activeDropdown === "footer"}
                onClick={() => handleDropdown("footer")}
              >
                <Link to="/adminpanel/footerdata" onClick={handleLinkClick}>
                  Footer Data
                </Link>
                <Link to="/adminpanel/editfooter" onClick={handleLinkClick}>
                  Edit Footer
                </Link>
              </DropdownButton>
            </ul>
          </div>
        </div>
        <div>{/* <Outlet /> */}</div>
      </div>
    </>
  );
}

function DropdownButton({ title, isOpen, onClick, children }) {
  return (
    <>
      <button className="dropdown-btn" onClick={onClick}>
        {title}
        <span className="custom-btn">{isOpen ? "-" : "+"}</span>
      </button>
      <div className={`dropdown-container ${isOpen ? "active" : ""}`}>
        {children}
      </div>
    </>
  );
}

export default Sidebar;
