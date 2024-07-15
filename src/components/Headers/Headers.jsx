import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Headers.css";
import corusviewLogo from "../../assets/logos/logo.png";
import { getBanner } from "../../Services/frontendServices";

function Headers() {
  const [headerClass, setHeaderClass] = useState("");

  const fetchData = async () => {
    try {
      const data = await getBanner();
      const color = data.head_color;

      if (color) {
        const className = `header-color-${color.replace("#", "")}`;

        // Create a new style element
        const style = document.createElement("style");
        style.innerHTML = `
          .${className} {
            background-color: ${color} !important;
          }
        `;
        // Append the style element to the document head
        document.head.appendChild(style);

        setHeaderClass(className);
      }
    } catch (error) {
      console.error("Error fetching header color:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="fixed-header">
        <nav
          className={`navbar navbar-expand-lg bg-body-tertiary ${headerClass}`}
          style={{
            background: !headerClass
              ? "radial-gradient(150.55% 150.55% at 50% 50%, #004c3f 0%, #000000 100%)"
              : "initial",
          }}
        >
          <div className="container-fluid">
            <Link to="/" className="navbar-brand" aria-current="page">
              <img src={corusviewLogo} alt="corusviewLogo" loading="lazy" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/about" className="nav-link" aria-current="page">
                    ABOUT US
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/projects" className="nav-link" aria-current="page">
                    UPCOMING PROJECTS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/nri-corner"
                    className="nav-link"
                    aria-current="page"
                  >
                    NRI CORNER
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/gallery" className="nav-link" aria-current="page">
                    GALLERY
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contact-us"
                    className="nav-link"
                    aria-current="page"
                  >
                    CONTACT US
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    to="/privacy-policy"
                    className="nav-link"
                    aria-current="page"
                  >
                    POLICY
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default Headers;
