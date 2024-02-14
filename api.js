const axios = require('axios');
require('dotenv').config();

const newsApiKey = process.env.newsApiKey;

const newsApiUrl = 'https://newsapi.org/v2/top-headlines';


const unsplashKey = process.env.unsplashKey;

const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

async function getTopHeadlines(countryCode) {
    try {
        const response = await axios.get(newsApiUrl, {
            params: {
                apiKey: newsApiKey,
                country: countryCode,
            },
        });
        const articles = response.data.articles;
        return articles;
    } catch (error) {
        console.error('Error fetching top headlines from News API:', error);
        throw error;
    }
}



async function getRandomImage(city) {
    try {
        const response = await axios.get(unsplashApiUrl, {
            params: {
                client_id: unsplashKey,
                query: city, 
            },
        });
        const imageUrl = response.data.urls.regular;
        return imageUrl;
    } catch (error) {
        console.error('Error fetching random image:', error);
        throw error;
    }
}

module.exports = { getTopHeadlines,getRandomImage };
