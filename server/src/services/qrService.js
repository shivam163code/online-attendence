const { createSession, getSession } = require('../utils/qrSessionStore');
const Attendance = require('../models/Attendance');
const AppError = require('../utils/AppError');

const generateAttendanceSession = async ({ teacherId, classId, subjectId, expiresInMinutes }) => {
  if (!teacherId || !classId || !subjectId) {
    throw new AppError('teacherId, classId, and subjectId are required', 400);
  }
  return createSession({ teacherId, classId, subjectId, expiresInMinutes });
};

const markAttendanceFromQr = async ({ token, studentId, status = 'present', remarks }) => {
  const session = getSession(token);
  if (!session) {
    throw new AppError('QR session is invalid or expired', 400);
  }

  return Attendance.create({
    studentId,
    teacherId: session.teacherId,
    classId: session.classId,
    subjectId: session.subjectId,
    date: new Date(),
    status,
    qrVerification: true,
    qrToken: token,
    remarks
  });
};

module.exports = { generateAttendanceSession, markAttendanceFromQr };
