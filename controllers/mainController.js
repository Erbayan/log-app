const unsplashService = require('../services/unsplashService');

exports.getMainPage = async (req, res) => {
  try {
    const keyword = req.query.keyword || 'nature';
    const images = await unsplashService.getImagesByKeyword(keyword);
    res.render('main', { images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

