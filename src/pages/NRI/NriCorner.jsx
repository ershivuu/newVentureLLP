import React, { useState, useEffect } from "react";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import "./NriCorner.css";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
import {
  getNriPageData,
  addNriPageFormData,
} from "../../Services/frontendServices";

function NriCorner() {
  const [bannerData, setBannerData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    comment: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const getNriBanner = async () => {
    try {
      const data = await getNriPageData();
      setBannerData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBannerData({
        id: 1,
        banner_heading: "Global Dreams, Local Homes.",
        banner_img: banner,
        section_one_heading: "NRI Corner",
        section_one_content:
          "   Corner India is a central participant in the worldwide housing market. Because of expanded urbanization, it has turned into a center point for high-profile NRIs (Non-Occupant Indians) to investigate different venture choices among private properties as i likewise guarantees rewarding Profit from Speculation (return for money invested) conceivable outcomes. Corusview venture Realty has scratched its name in probably the greatest and most famous Indian urban communities. Our vision with Address Of Goodness is to make mindful lodging where you can encounter insightful residing. Aside from building condition of craftsmanship structures with immaculate idea and plan we likewise construct spaces that sustain extraordinary recollections and lovely minutes.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNriPageFormData(formData);
      setFormSubmitted(true);
      setFormData({ name: "", contact: "", email: "", comment: "" }); // Reset the form
    } catch (error) {
      alert("Internal server error!");
    }
  };
  useEffect(() => {
    getNriBanner();
  }, []);

  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="single-banner">
          <div className="single-banner-image">
            <img
              src={bannerData?.banner_img}
              alt={bannerData?.banner_heading}
            />
            <div className="colored-overlay"></div>
            <div className="single-banner-heading">
              <p>{bannerData?.banner_heading}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="nri-data">
        <div className="nri-heading">
          <p>{bannerData?.section_one_heading}</p>
        </div>
        <div className="nri-content">
          <p>{bannerData?.section_one_content}</p>
        </div>
      </div>
      <div className="nri-form">
        <p>Get Quote</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Comment"
            />
          </div>
          <div className="submit-btns">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footers></Footers>
    </>
  );
}

export default NriCorner;
