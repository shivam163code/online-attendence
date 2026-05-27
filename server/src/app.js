const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const sanitizeInput = require('./middleware/sanitizeMiddleware');
const rateLimit = require('./middleware/rateLimit');

const createApp = () => {
  const app = express();
  app.locals.io = null;

  app.use(helmet());
  app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(sanitizeInput);
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 250 }));
  app.use((req, res, next) => {
    req.io = app.locals.io;
    next();
  });

  app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  app.use('/api', apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
