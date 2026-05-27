const express = require('express');
const { listAttendance, createAttendance, updateAttendance, deleteAttendance, createQrSession, scanQrAttendance } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { attendanceValidator } = require('../validators/attendanceValidator');
const validate = require('../validators/commonValidator');

const router = express.Router();

router.use(protect);
router.get('/', authorize('admin', 'teacher', 'student'), listAttendance);
router.post('/', authorize('admin', 'teacher'), attendanceValidator, validate, createAttendance);
router.post('/qr-session', authorize('admin', 'teacher'), createQrSession);
router.post('/scan', authorize('student', 'teacher', 'admin'), scanQrAttendance);
router.patch('/:id', authorize('admin', 'teacher'), updateAttendance);
router.delete('/:id', authorize('admin'), deleteAttendance);

module.exports = router;
