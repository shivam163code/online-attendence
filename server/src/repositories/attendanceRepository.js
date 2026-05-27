const Attendance = require('../models/Attendance');

const attendanceRepository = {
  create: (data) => Attendance.create(data),
  findById: (id) => Attendance.findById(id),
  findAll: (query = {}) => Attendance.find(query)
    .populate('studentId')
    .populate('teacherId')
    .populate('classId')
    .populate('subjectId')
    .sort({ createdAt: -1 }),
  updateById: (id, data) => Attendance.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  deleteById: (id) => Attendance.findByIdAndDelete(id),
  findTodaySummary: async () => Attendance.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ])
};

module.exports = attendanceRepository;
