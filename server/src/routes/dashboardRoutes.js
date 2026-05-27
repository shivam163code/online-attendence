const express = require('express');
const { dashboardStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, authorize('admin', 'teacher', 'student'), dashboardStats);

module.exports = router;
