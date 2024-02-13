const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const mainRoutes = require('./routes/mainRoutes'); // Импортируем mainRoutes
const db = require('./config/db');
const cors = require('cors');
const mainController = require('./controllers/mainController');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');

db();

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});




app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/main', mainRoutes); // Добавляем mainRoutes

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
