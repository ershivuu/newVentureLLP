import React, { useEffect, useState } from "react";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
function Contact() {
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="nri-banner">
          <div className="banner-img">
            <img src={banner} alt="" />
          </div>
        </div>
        <div className="blur-wrapper"></div>
        <div className="banner-heading">
          <p>Global Dreams, Local Homes.</p>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default Contact;
