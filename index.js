const express = require('express');
const bodyParser = require('body-parser'); // Добавляем body-parser
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const db = require('./config/db');
const cors = require('cors');
const User = require('./models/User'); // Используйте ./User для импорта модели User

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Добавляем парсер для данных формы
app.use(cors());

// Установка шаблонизатора (EJS)
app.set('view engine', 'ejs');

// Подключение к базе данных MongoDB Atlas
db();

// Маршрут для страницы входа (GET запрос)
app.get('/login', (req, res) => {
  res.render('login'); // Предполагается, что у вас есть шаблонизатор (например, EJS) для отображения страниц
});

// Маршрут для страницы регистрации (GET запрос)
app.get('/register', (req, res) => {
  res.render('register'); // Предполагается, что у вас есть шаблонизатор (например, EJS) для отображения страниц
});

// Маршруты для аутентификации и авторизации
app.use('/auth', authRoutes);

// Маршруты для административной панели
app.get('/admin', async (req, res) => {
    try {
      const users = await User.find(); // Получаем данные всех пользователей из базы данных
      res.render('admin', { page: 'index', users: users }); // Передаем данные пользователей в шаблон EJS
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });

// GET-запрос для страницы редактирования пользователя
app.get('/admin/editUser', async (req, res) => {
    try {
      const users = await User.find();
      res.render('admin', { page: 'editUser', users: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  
  // POST-запрос для обновления пользователя
  app.post('/admin/editUser', async (req, res) => {
    try {
      const { userId, username, isAdmin } = req.body;
      await User.findByIdAndUpdate(userId, { username, isAdmin });
      res.redirect('/admin'); // Перенаправляем обратно на главную страницу административной панели
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  
  
app.get('/admin/addUser', (req, res) => {
  res.render('admin', { page: 'addUser' }); // Отображение страницы добавления пользователя
});
// Обработчик POST-запроса для добавления пользователя
app.post('/admin/addUser', async (req, res) => {
    try {
      // Получаем данные из тела запроса
      const { username, password, isAdmin } = req.body;
  
      // Создаем нового пользователя
      const newUser = new User({
        username,
        password,
        isAdmin: isAdmin === 'on' // Преобразуем строку "on" в тип Boolean
      });
  
      // Сохраняем пользователя в базе данных
      const savedUser = await newUser.save();
  
      // Отправляем ответ клиенту
      res.status(201).json({ success: true, user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  
// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
