import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
function Sidebar({ isOpen }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="front-side-bar">
        <div className="side-bar">
          <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
            <ul>
              {/* <Link to="/adminpanel/upcomingprojects">
                <a>Upcoming Projects</a>
              </Link> */}

              <button className="dropdown-btn" onClick={handleDropdown}>
              Upcoming Projects
                <span className="custom-btn">
                  {dropdownOpen ? '-' : '+'}
                  
                </span>
              </button>
              <div
                className={`dropdown-container  ${
                  dropdownOpen ? "active" : ""
                }`}
                style={{ display: dropdownOpen ? "block" : "none" }}
              >
                <Link to="/adminpanel/pageheading">
                  <a href="#">Page Heading </a>
                </Link>
                <Link to="/adminpanel/bannerimages">
                  <a href="#">Banner Images </a>
                </Link>
                <Link to="/FrontEndPanel/Section2">
                  <a href="#">Section 2 </a>
                </Link>
                <Link to="/FrontEndPanel/Section3">
                  <a href="#">Section 3 </a>
                </Link>

                <Link to="/FrontEndPanel/Section4">
                  <a href="#">Section 4 </a>
                </Link>
                <Link to="/FrontEndPanel/Section5">
                  <a href="#">Section 5 </a>
                </Link>
              </div>

              <Link to="/FrontEndPanel/EditInterviewSchedule">
                <a href="#"> Interview Schedule </a>
              </Link>

              <Link to="/FrontEndPanel/FaqSection">
                <a href="#">FAQ</a>
              </Link>
              <Link to="/FrontEndPanel/EditContact">
                <a href="#"> Contact </a>
              </Link>

              <Link to="/FrontEndPanel/EditFooter">
                <a href="#">Footer</a>
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
