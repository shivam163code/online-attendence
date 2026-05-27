const { body } = require('express-validator');

const attendanceValidator = [
  body('studentId').notEmpty().withMessage('studentId is required'),
  body('teacherId').notEmpty().withMessage('teacherId is required'),
  body('classId').notEmpty().withMessage('classId is required'),
  body('subjectId').notEmpty().withMessage('subjectId is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('status').isIn(['present', 'absent', 'late']).withMessage('Invalid attendance status')
];

module.exports = { attendanceValidator };
