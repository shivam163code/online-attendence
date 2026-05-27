const asyncHandler = require('../utils/asyncHandler');
const { registerUser, loginUser } = require('../services/authService');
const AppError = require('../utils/AppError');

const register = asyncHandler(async (req, res) => {
  const authData = await registerUser(req.body);
  res.status(201).json({ message: 'Registered successfully', data: authData });
});

const login = asyncHandler(async (req, res) => {
  const authData = await loginUser(req.body);
  res.status(200).json({ message: 'Login successful', data: authData });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError('Email is required', 400);
  }
  res.status(200).json({ message: 'If the account exists, reset instructions have been sent.' });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json({ data: req.user });
});

module.exports = { register, login, forgotPassword, me };
