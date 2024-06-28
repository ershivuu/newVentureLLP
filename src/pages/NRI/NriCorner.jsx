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
  const [formErrors, setFormErrors] = useState({
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

    // Clear the error message when user starts typing again
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    let errors = {};
    if (formData.name.trim() === "") {
      errors.name = "! Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Only alphabets are allowed";
    }
    if (formData.contact.trim() === "") {
      errors.contact = "! Contact is required";
    } else if (!/^\d*$/.test(formData.contact)) {
      errors.contact = "! Only numbers are allowed";
    }
    if (formData.email.trim() === "") {
      errors.email = "! Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (formData.comment.trim() === "") {
      errors.comment = "! Comment is required";
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If no errors, submit the form
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
          <div className="input-fields">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </div>
          <div className="input-fields">
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
            />
            {formErrors.contact && (
              <span className="error">{formErrors.contact}</span>
            )}
          </div>
          <div className="input-fields">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>
          <div className="input-fields">
            <input
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Comment"
            />
            {formErrors.comment && (
              <span className="error">{formErrors.comment}</span>
            )}
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
