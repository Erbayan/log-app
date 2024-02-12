const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Маршрут для входа
router.post('/login', authController.login);

// Маршрут для страницы регистрации
router.get('/register', (req, res) => {
    res.render('register');
  });
  
  // Маршрут для регистрации нового пользователя
  router.post('/register', authController.register);

module.exports = router;
