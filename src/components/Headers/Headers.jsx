import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Headers.css";
import corusviewLogo from "../../assets/logos/logo.png";
function Headers() {
  return (
    <>
      <div className="fixed-header">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand" aria-current="page">
              <img src={corusviewLogo} alt="corusviewLogo" />
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
                    UPCOMMING PROJECTS
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
                <li className="nav-item">
                  <Link to="/counter" className="nav-link" aria-current="page">
                    COUNTER
                  </Link>
                </li>
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
