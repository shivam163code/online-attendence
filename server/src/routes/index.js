const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const attendanceRoutes = require('./attendanceRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const classRoutes = require('./classRoutes');
const subjectRoutes = require('./subjectRoutes');
const notificationRoutes = require('./notificationRoutes');
const assignmentRoutes = require('./assignmentRoutes');
const reportRoutes = require('./reportRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/classes', classRoutes);
router.use('/subjects', subjectRoutes);
router.use('/notifications', notificationRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
