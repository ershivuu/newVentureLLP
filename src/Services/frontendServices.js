import axios from "axios";
import { FRONTEND_URL } from "../Config/config";
const apiUrl = FRONTEND_URL;

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
