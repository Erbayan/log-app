const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Обратите внимание на изменение здесь

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
exports.register = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!password) {
        return res.status(400).json({ success: false, message: 'Password is required' });
      }
  
      // Хеширование пароля перед сохранением
      const hashedPassword = await bcrypt.hash(password, 10); // Используйте асинхронный метод хеширования
  
      // Создание нового пользователя
      const newUser = new User({
        username,
        password: hashedPassword
      });
  
      // Сохранение пользователя в базу данных
      await newUser.save();
  
      // Генерация JWT токена для нового пользователя
      const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET);
  
      res.json({ success: true, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  
  
  
  