const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// Маршруты для административной панели
router.get('/', adminController.getUsers);
router.post('/add', adminController.addUser);
router.put('/edit/:id', adminController.editUser);
router.delete('/delete/:id', adminController.deleteUser);





router.post('/addUser', async (req, res) => {
    try {
      const { username, password, isAdmin } = req.body;
      const newUser = new User({ username, password, isAdmin });
      await newUser.save();
      res.json({ success: true, newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  module.exports = router;
