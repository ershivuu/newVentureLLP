import axios from "axios";
import { API_URL } from "../Config/config";
const apiUrl = API_URL;

export const upcommingPageBannerData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAllSectionFirst`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
};

export const upcommingPageBannerImage = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAllSectionFirst`);
    if (response.data && response.data.length > 0) {
      return response.data[0].banner_images || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching banner images:", error);
    throw error;
  }
};
export const getUpcommingProjects = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAllContentWithSliderImages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getBanner = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getHome`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error;
  }
};
export const getHomeSectionFirstData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getHomeSectionFirst`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home section first data:", error);
    throw error;
  }
};

export const getHomeSlider = async () => {
  try {
    const response = await axios.get(`${apiUrl}/homeSectionSecond`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home section second data:", error);
    throw error;
  }
};

export const getHomeSectionThree = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getHomeSectionThird`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home section first data:", error);
    throw error;
  }
};

export const aboutPageBannerData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/aboutus_banner`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
};

export const aboutPageBannerImage = async () => {
  try {
    const response = await axios.get(`${apiUrl}/aboutus_banner`);
    if (response.data && response.data.data.length > 0) {
      return response.data.data.map((item) => ({
        id: item.id,
        img_path: item.banner_img_path,
        img_name: item.banner_img_originalname,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching banner images:", error);
    throw error;
  }
};
export const getAboutUsSectionFirst = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAboutUsSectionFirst`);
    return response.data;
  } catch (error) {
    console.error("Error fetching About Us section data:", error);
    throw error;
  }
};

export const getAboutSectionTwo = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAboutUsSectionSecond`);
    return response.data.data; // Assuming the actual data is nested under 'data' key
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null if there's an error
  }
};
export const getNriPageData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getNriPage`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error back to the caller
  }
};
export const addNriPageFormData = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/addNriPageForm`, {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      comment: formData.comment,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error; // Propagate the error back to the caller
  }
};
export const getContactPageData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getContactPage`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return null;
  }
};

export const submitEmail = async (email) => {
  try {
    const response = await axios.post(
      `${apiUrl}/addFooterEmail`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getFooterData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getFooterData`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getAllGalleryImages = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAllGalleryImages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getGalleryBanner = async () => {
  try {
    const response = await axios.get(`${apiUrl}/galleryBanner`);
    return response.data;
  } catch (error) {
    console.error("Error fetching banner data:", error);
    throw error;
  }
};
export const addContactFormData = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/addContactUsForm`, {
      name: formData.name,
      phone: formData.phone,
      comment: formData.comment,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error; // Propagate the error back to the caller
  }
};
