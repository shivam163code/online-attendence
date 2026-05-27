const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    admissionNo: { type: String, required: true, unique: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    guardianName: String,
    phone: String,
    address: String,
    attendancePercentage: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
