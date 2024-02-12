const express = require('express');
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const db = require('./config/db');
const cors = require('cors');
const User = require('./models/User'); 

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());


app.set('view engine', 'ejs');


db();


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register'); 
});

app.use('/auth', authRoutes);

app.get('/admin', async (req, res) => {
    try {
      const users = await User.find(); 
      res.render('admin', { page: 'index', users: users }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });

app.get('/admin/editUser', async (req, res) => {
    try {
      const users = await User.find();
      res.render('admin', { page: 'editUser', users: users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  
  app.post('/admin/editUser', async (req, res) => {
    try {
      const { userId, username, isAdmin } = req.body;
      await User.findByIdAndUpdate(userId, { username, isAdmin });
      res.redirect('/admin'); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  
  
app.get('/admin/addUser', (req, res) => {
  res.render('admin', { page: 'addUser' }); 
});

app.post('/admin/addUser', async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
  
      const newUser = new User({
        username,
        password,
        isAdmin: isAdmin === 'on' 
      });
  
      const savedUser = await newUser.save();
  
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
