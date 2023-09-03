const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User login route
router.get('/login', userController.getLoginPage);
router.post('/login', userController.postLogin);

// User dashboard route
router.get('/dashboard', userController.getDashboard);

module.exports = router;
