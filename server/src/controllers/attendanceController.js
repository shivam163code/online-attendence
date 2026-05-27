const asyncHandler = require('../utils/asyncHandler');
const attendanceService = require('../services/attendanceService');
const attendanceRepository = require('../repositories/attendanceRepository');
const { createNotificationPayload } = require('../utils/notification');
const Notification = require('../models/Notification');
const { generateAttendanceSession, markAttendanceFromQr } = require('../services/qrService');

const listAttendance = asyncHandler(async (req, res) => {
  const records = await attendanceRepository.findAll(req.query);
  res.status(200).json({ data: records });
});

const createAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.markAttendance({
    ...req.body,
    markedBy: req.user._id
  });

  if (req.io) {
    req.io.emit('attendance:created', attendance);
  }

  if (req.body.studentUserId) {
    await Notification.create(createNotificationPayload({
      userId: req.body.studentUserId,
      title: 'Attendance marked',
      message: `Your attendance for ${new Date(req.body.date).toDateString()} has been recorded.`,
      type: 'success'
    }));
  }

  res.status(201).json({ message: 'Attendance created', data: attendance });
});

const updateAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceService.updateAttendance(req.params.id, req.body);
  if (req.io) {
    req.io.emit('attendance:updated', attendance);
  }
  res.status(200).json({ message: 'Attendance updated', data: attendance });
});

const deleteAttendance = asyncHandler(async (req, res) => {
  const deleted = await attendanceRepository.deleteById(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Attendance record not found' });
  }
  res.status(200).json({ message: 'Attendance deleted' });
});

const createQrSession = asyncHandler(async (req, res) => {
  const session = await generateAttendanceSession({
    teacherId: req.body.teacherId || req.user._id,
    classId: req.body.classId,
    subjectId: req.body.subjectId,
    expiresInMinutes: req.body.expiresInMinutes || 10
  });

  res.status(201).json({ message: 'QR session generated', data: session });
});

const scanQrAttendance = asyncHandler(async (req, res) => {
  const attendance = await markAttendanceFromQr({
    token: req.body.token,
    studentId: req.body.studentId,
    status: req.body.status || 'present',
    remarks: req.body.remarks
  });

  if (req.io) {
    req.io.emit('attendance:created', attendance);
  }

  res.status(201).json({ message: 'Attendance marked from QR', data: attendance });
});

module.exports = { listAttendance, createAttendance, updateAttendance, deleteAttendance, createQrSession, scanQrAttendance };
