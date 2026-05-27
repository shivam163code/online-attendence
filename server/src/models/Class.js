const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    section: { type: String, trim: true },
    academicYear: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
    timetable: [
      {
        day: String,
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        startTime: String,
        endTime: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', classSchema);
