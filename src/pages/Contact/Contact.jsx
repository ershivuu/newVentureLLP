import React, { useEffect, useState } from "react";
import { getContactPageData } from "../../Services/frontendServices";
import { addContactFormData } from "../../Services/frontendServices";

import "./Contact.css";
import Headers from "../../components/Headers/Headers";
import Footers from "../../components/Footers/Footers";
import banner from "../../assets/images/vector-imgs/site-3.jpg";
import facebookLogo from "../../assets/logos/facebook-black.png";
import instagramLogo from "../../assets/logos/instagram-black.png";

import youtubeLogo from "../../assets/logos/youtube-black.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
function Contact() {
  const [bannerData, setBannerData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",

    comment: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dummyData = {
    id: 0,
    heading: "Contact Us",
    banner_img: banner,
    email: "email@corusview.com",
    phone: "+91 96172-44330",
  };
  const [contactData, setContactData] = useState(dummyData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    })); // Clear the error message when user starts typing again
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
      errors.name = "! Only alphabets are allowed";
    }
    if (formData.phone.trim() === "") {
      errors.phone = "! Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = "! Only numbers are allowed";
    } else if (formData.phone.length < 10 || formData.phone.length > 12) {
      errors.phone = "! Number should be between 10 to 12 digits";
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
      await addContactFormData(formData);
      setFormSubmitted(true);
      setFormData({ name: "", phone: "", comment: "" });
      setNotification({
        open: true,
        message: "Form submitted successfully!",
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: "Internal server error! Please try again later.",
        severity: "error",
      });
      console.error("Error submitting form:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactPageData();
      if (data) {
        setContactData(data);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Headers></Headers>
      <div className="wrapper">
        <div className="single-banner">
          <div className="single-banner-image">
            <img src={contactData.banner_img} alt="Banner" loading="lazy" />
            <div className="colored-overlay"></div>
            <div className="single-banner-heading">
              <p>{contactData.heading}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-details">
        <div>
          <p>Write with us</p>
          <p>
            <a href={`mailto:${contactData.email}`}>{contactData.email} →</a>
          </p>
        </div>
        <div>
          <p>Talk with us</p>
          <p>
            <a href={`tel:+91${contactData.phone}`}>+91 {contactData.phone}</a>
          </p>
        </div>
      </div>
      <div className="contect-us">
        <p>Connect with us</p>
        <div className="social-icons">
          <div>
            <a href="" target="_blank">
              <img src={facebookLogo} alt="" loading="lazy" />
            </a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/corusviewventure/?igsh=MXZvd2c1Z251Y2p6eg%3D%3D"
              target="_blank"
            >
              <img src={instagramLogo} alt="" loading="lazy" />
            </a>
          </div>

          <div>
            <a href="" target="_blank"></a>
            <img src={youtubeLogo} alt="" loading="lazy" />
          </div>
        </div>
      </div>
      <div className="nri-form">
        <p>Contact Us</p>
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="phone"
            />
            {formErrors.phone && (
              <span className="error">{formErrors.phone}</span>
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
      </div>{" "}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000} // Adjust duration as needed
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={notification.severity}
        >
          {notification.message}
        </MuiAlert>
      </Snackbar>
      <Footers></Footers>
    </>
  );
}

export default Contact;
