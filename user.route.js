const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// User signup route
router.post('/auth/signup', userController.signUp);

// User login route
router.post('/auth/login', userController.login);

// User logout route
router.post('/auth/logout', userController.logout);

const {
    signUp,
    login,
    logout,
    getCouponCode,
    bookShow
  } = require('../controllers/user.controller');
  
  // Signup Route
  router.post('/auth/signup', signUp);
  
  // Login Route
  router.post('/auth/login', login);
  
  // Logout Route
  router.post('/auth/logout', logout);
  
  // Get Coupon Code Route
  router.get('/:userId/coupon', getCouponCode);
  
  // Book Show Route
  router.post('/:userId/bookings', bookShow);

module.exports = router;
