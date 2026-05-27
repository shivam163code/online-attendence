const attendanceRepository = require('../repositories/attendanceRepository');
const AppError = require('../utils/AppError');

const markAttendance = async (payload) => {
  try {
    return await attendanceRepository.create(payload);
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError('Attendance already marked for this student and subject on the selected date', 400);
    }
    throw error;
  }
};

const updateAttendance = async (id, payload) => {
  const attendance = await attendanceRepository.updateById(id, payload);
  if (!attendance) {
    throw new AppError('Attendance record not found', 404);
  }
  return attendance;
};

module.exports = { markAttendance, updateAttendance };
