import React from "react";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import "./NriCorner.css";
import banner from "../../assets/images/vector-imgs/site-3.jpg";

function NriCorner() {
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="single-banner">
          <div className="single-banner-image">
            <img src={banner} alt="" />
            <div className="colored-overlay"></div>
            <div className="single-banner-heading">
              <p>Global Dreams, Local Homes.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="nri-data">
        <div className="nri-heading">
          <p>NRI Corner</p>
        </div>
        <div className="nri-content">
          <p>
            Corner India is a central participant in the worldwide housing
            market. Because of expanded urbanization, it has turned into a
            center point for high-profile NRIs (Non-Occupant Indians) to
            investigate different venture choices among private properties as it
            likewise guarantees rewarding Profit from Speculation (return for
            money invested) conceivable outcomes. Corusview venture Realty has
            scratched its name in probably the greatest and most famous Indian
            urban communities. Our vision with Address Of Goodness is to make
            mindful lodging where you can encounter insightful residing. Aside
            from building condition of craftsmanship structures with immaculate
            idea and plan we likewise construct spaces that sustain
            extraordinary recollections and lovely minutes.
          </p>
        </div>
      </div>
      <Footers></Footers>
    </>
  );
}

export default NriCorner;
