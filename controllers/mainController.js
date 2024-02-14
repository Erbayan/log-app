
exports.getMainPage = async (req, res) => {
  try {
    res.render('main', { images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

