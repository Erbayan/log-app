const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users); // Добавляем эту строку для проверки получения данных о пользователях

    res.render('admin', { page: 'index', users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;
    const newUser = new User({ username, password, isAdmin });
    await newUser.save();
    res.json({ success: true, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, isAdmin } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { username, password, isAdmin }, { new: true });
    res.json({ success: true, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
