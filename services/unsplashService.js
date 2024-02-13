const axios = require('axios');
require('dotenv').config();

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function getImagesByKeyword(keyword) {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=${ACCESS_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    throw error;
  }
}

async function searchImagesByColor(color) {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos?color=${color}&client_id=${ACCESS_KEY}`);
    return response.data.results; 
  } catch (error) {
    console.error('Error searching images by color from Unsplash:', error);
    throw error;
  }
}

module.exports = {
  getImagesByKeyword,
  searchImagesByColor
};