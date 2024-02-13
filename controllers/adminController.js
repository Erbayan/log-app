const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAdminPage = async (req, res) => {
  try {
    const users = await User.find(); 
    res.render('admin', { page: 'index', users: users }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getEditUserPage = async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin', { page: 'editUser', users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { userId, username, isAdmin } = req.body;
    await User.findByIdAndUpdate(userId, { username, isAdmin });
    res.redirect('/admin'); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getAddUserPage = (req, res) => {
  res.render('admin', { page: 'addUser' }); 
};

exports.addUser = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin: isAdmin === 'on' 
    });

    const savedUser = await newUser.save();

    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await User.findByIdAndDelete(userId);
    res.redirect('/admin'); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
