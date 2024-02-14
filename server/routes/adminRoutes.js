const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAdminPage);
router.get('/editUser', adminController.getEditUserPage);
router.post('/editUser', adminController.editUser);
router.get('/addUser', adminController.getAddUserPage);
router.post('/addUser', adminController.addUser);
router.post('/deleteUser', adminController.deleteUser);

module.exports = router;
