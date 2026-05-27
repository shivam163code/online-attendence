const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server error';

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, errors: Object.values(err.errors).map((item) => item.message) });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value', errors: err.keyValue });
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

module.exports = { notFound, errorHandler };
