const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const ProfileSchema = mongoose.Schema({
  image: {
    type: String,
    required: false,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  parent_name: {
    type: String,
    required: true
  },
  reg_no: {
    type: String,
    required: true
  },
  roll_no: {
    type: String,
    required: true
  },
  blood_group: {
    type: String,
    required: true
  },
  campus_code: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  grades: [
    {
      semester: { type: Number, required: true, min: 1, max: 8, unique: true },
      gradeInfo: [
        {
          subject: { type: String, required: true },
          grade: { type: String, required: true }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Profile', ProfileSchema);
