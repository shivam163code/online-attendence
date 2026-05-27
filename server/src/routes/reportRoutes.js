const express = require('express');
const { attendanceReport } = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/attendance', protect, authorize('admin', 'teacher'), attendanceReport);

module.exports = router;
