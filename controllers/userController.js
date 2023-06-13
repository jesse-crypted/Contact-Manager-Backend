const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('./../models/contactModel.js');

// @desc Register a user
// @route POST /api/users/register
// @access public
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already registered!');
  }


  //   Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password: ', hashedPassword);
  res.json({ message: 'Register the user' });
});

// @desc Login user
// @route POST /api/users/login
// @access public
exports.loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login user' });
});

// @desc Current user info
// @route POST /api/users/current
// @access private
exports.currentUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Current user info' });
});
