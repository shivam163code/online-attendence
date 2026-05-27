const Attendance = require('../models/Attendance');
const User = require('../models/User');
const ClassModel = require('../models/Class');

const getDashboardStats = async () => {
  const [students, teachers, classes, attendanceSummary] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'teacher' }),
    ClassModel.countDocuments(),
    Attendance.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ])
  ]);

  const summaryMap = attendanceSummary.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  return {
    students,
    teachers,
    classes,
    present: summaryMap.present || 0,
    absent: summaryMap.absent || 0,
    late: summaryMap.late || 0
  };
};

module.exports = { getDashboardStats };
