import React, { useEffect, useState } from "react";
import "./Contact.css"
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
function Contact() {
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="single-banner">
          <div className="single-banner-image">
            <img src={banner} alt="" />
            <div className="colored-overlay"></div>
            <div className="single-banner-heading">
              <p>Contact Us</p>
            </div>
          </div>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Contact;
