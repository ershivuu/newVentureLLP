import axios from 'axios';

const BASE_URL = 'http://192.168.29.110:5000';


//get upcoming project heading
export const getAllSectionFirst = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getSectionFirstContent`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// put upcoming project heading
export const updateSectionFirstContent = async (id, newData) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateOnlyContent/${id}`, newData);
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };


// Get all banner images
  export const getAllBannerImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllSectionFirst`);
      return response.data;
    } catch (error) {
      console.error('Error fetching banner images:', error);
      throw error;
    }
  };



  export const updateBannerImage = async (imageId, file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await axios.put(`${BASE_URL}/updateBannerImages/${imageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating banner image:', error);
      throw error;
    }
  };