const express = require('express');
const { listNotifications, markRead, createNotification } = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', listNotifications);
router.post('/', authorize('admin', 'teacher'), createNotification);
router.patch('/:id/read', markRead);

module.exports = router;
