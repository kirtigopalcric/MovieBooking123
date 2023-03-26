const { v4: uuidv4 } = require('uuid');
const b2a = require('b2a');
const jwt = require('jsonwebtoken');
const uuidTokenGenerator = require('uuid-token-generator');

const User = require('../models/user.model');
const { generateHash } = require('../utils/password.utils');

const tokenGenerator = new uuidTokenGenerator();

// Function to generate a coupon code for a user
const getCouponCode = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const couponCode = b2a.UUID.generate();

    // Save the coupon code in the user object and update the user
    user.couponCode = couponCode;
    await user.save();

    res.json({ couponCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to book a show for a user
const bookShow = async (req, res) => {
  try {
    const { userId } = req.params;
    const { showId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the show is already booked by the user
    if (user.bookedShows.includes(showId)) {
      return res.status(400).json({ message: 'Show already booked by user' });
    }

    // Add the show to the user's bookedShows array and update the user
    user.bookedShows.push(showId);
    await user.save();

    res.json({ message: 'Show booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login API
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists and the entered password matches with the password in the database
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate and save access token in the database
    const accessToken = generate();
    user.access_token = accessToken;
    user.isLoggedIn = true;
    await user.save();

    res.status(200).json({ message: 'Login success', access_token: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SignUp API
exports.signUp = async (req, res) => {
  try {
    const { first_name, last_name, password } = req.body;
    const username = toBase64(first_name + last_name);

    // Create a new User object
    const user = new User({
      username,
      password,
      access_token: uuidv4(),
      isLoggedIn: false,
      uuid: uuidv4New(),
    });

    // Save the user object in the database
    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout API
exports.logout = async (req, res) => {
  try {
    const { uuid } = req.body;

    // Find the user and update the access token and isLoggedIn fields to null and false respectively
    const user = await User.findOne({ uuid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.access_token = null;
    user.isLoggedIn = false;
    await user.save();

    res.status(200).json({ message: 'Logout success' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCouponCode, bookShow };
