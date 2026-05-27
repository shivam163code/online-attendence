const asyncHandler = require('../utils/asyncHandler');
const userRepository = require('../repositories/userRepository');

const listUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.findAll();
  res.status(200).json({ data: users });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userRepository.updateById(req.params.id, req.body);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User updated', data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await userRepository.deleteById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User deleted' });
});

module.exports = { listUsers, updateUser, deleteUser };
