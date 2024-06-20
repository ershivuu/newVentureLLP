import axios from "axios";
import { FRONTEND_URL } from "../Config/config";
const apiUrl = FRONTEND_URL;

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAllSectionFirst`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    throw error;
  }
};

export const fetchBannerImages = async () => {
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
export const fetchProject = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getAllContentWithSliderImages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
