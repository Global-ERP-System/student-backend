const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  roll_no: { type: Number, required: true },
  info: [
    {
      semester: { type: Number, required: true, min: 1, max: 8, unique: true },
      grades: [
        {
          subject: { type: String, required: true },
          grade: { type: String, required: true }
        }
      ]
    }
  ]
});

const Grade = new mongoose.model('Grade', gradeSchema);
module.exports = Grade;
