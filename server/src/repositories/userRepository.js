const User = require('../models/User');

const userRepository = {
  findByEmail: (email) => User.findOne({ email }).select('+password'),
  findById: (id) => User.findById(id),
  create: (data) => User.create(data),
  findAll: (query = {}) => User.find(query).sort({ createdAt: -1 }),
  updateById: (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteById: (id) => User.findByIdAndDelete(id)
};

module.exports = userRepository;
