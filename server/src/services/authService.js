const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/token');
const AppError = require('../utils/AppError');

const createAuthPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken({ id: user._id, role: user.role }, process.env.JWT_EXPIRES_IN || '7d', process.env.JWT_SECRET)
});

const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }
  const user = await userRepository.create({ name, email, password, role });
  return createAuthPayload(user);
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new AppError('Invalid credentials', 401);
  }
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });
  return createAuthPayload(user);
};

module.exports = { registerUser, loginUser };
