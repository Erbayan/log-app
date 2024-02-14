const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const adminRoutes = require('../routes/adminRoutes');
const mainRoutes = require('../routes/mainRoutes');
const db = require('../config/db');
const cors = require('cors');
const mainController = require('../controllers/mainController');
const axios = require('axios'); 
const { getTopHeadlines, getRandomImage } = require('../api');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set('view engine', 'ejs');

db();

app.get('/', (req, res) => {
  res.redirect('/register'); 
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/main', async (req, res) => {
    try {
        const headlines = await getTopHeadlines('us');
        const imageUrl = await getRandomImage('New York');
        
        res.render('main', { headlines, imageUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/main', mainRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
