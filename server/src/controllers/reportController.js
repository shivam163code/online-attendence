const asyncHandler = require('../utils/asyncHandler');
const Attendance = require('../models/Attendance');

const attendanceReport = asyncHandler(async (req, res) => {
  const report = await Attendance.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({ data: report });
});

module.exports = { attendanceReport };
