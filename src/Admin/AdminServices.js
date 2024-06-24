import axios from 'axios';

const BASE_URL = 'http://192.168.1.14:5000';


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

  // Add a banner image
export const addBannerImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('banner_img', file);

    const response = await axios.put(`${BASE_URL}/addSectionFirstImages/1`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding banner image:', error);
    throw error;
  }
};

// delete a banner image
export const deleteBannerImage = async (imageId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteBannerImage/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting banner image:', error);
    throw error;
  }
};

// Get all slider images
export const getAllSliderImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllSliderImages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching slider images:', error);
    throw error;
  }
};

// Update a slider image
export const updateSliderImage = async (sliderImgId, file) => {
  try {
    const formData = new FormData();
    formData.append('slider_img', file);

    const response = await axios.put(`${BASE_URL}/updateSliderImages/${sliderImgId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating slider image:', error);
    throw error;
  }
};


// Delete a slider image
export const deleteSliderImage = async (sliderImgId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteSliderImage/${sliderImgId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting slider image:', error);
    throw error;
  }
};


// get all data api
export const fetchContentWithSliderImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllContentWithSliderImages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// add slider images 
export const addSliderImage = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addSliderImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding slider image:', error);
    throw error;
  }
};


// update content and vedio
export const updateContentWithVideo = async (contentId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateContentWithVideo/${contentId}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// add new project api
export const addContentWithVideo = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addContentWithVideo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding slider image:', error);
    throw error;
  }
};


//delete new project data 

export const deleteContainerData = async (deleteContentId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteContainerData/${deleteContentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting container data:', error);
    throw error;
  }
};


// Get Home Logo and Banner Image
export const getHomeData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getHome`);
    return response.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};


// PUT Home Logo and banner image
export const updateHomeData = async (id, newData) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateHome`, { id, ...newData });
    return response.data;
  } catch (error) {
    console.error('Error updating home data:', error);
    throw error;
  }
};

// Get home section first data
export const getHomeSectionFirst = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getHomeSectionFirst`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Update Home Section First Data
export const updateHomeSectionFirst = async (id, newData) => {
  try {
    const response = await axios.put(`${BASE_URL}/updateHomeSectionFirst`, newData);
    return response.data; // Assuming your API returns data upon successful update
  } catch (error) {
    throw new Error('Error updating home section first data:', error);
  }
};

// Get home section second data
export const getHomeSectionSecond = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/homeSectionSecond`);
    return response.data;
  } catch (error) {
    console.error('Error fetching HomeSectionSecond data:', error);
    return null;
  }
};

// Update Home Section Second Data 
export const updateHomeSectionSecond = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/homeSectionSecond/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating HomeSectionSecond data:', error);
    return null;
  }
};


// ADD Home Section Second Data 

export const addHomeSectionSecond = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/homeSectionSecond`, formData);
    return response;
  } catch (error) {
    console.error('Error adding Home Section Second image:', error);
    return null;
  }
};

// Delete Home Section Second Data

export const deleteHomeSectionSecond = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/homeSectionSecond/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Home Section Second data:', error);
    return null;
  }
};
