const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeNo: { type: String, required: true, unique: true },
    subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    classIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    phone: String,
    expertise: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
