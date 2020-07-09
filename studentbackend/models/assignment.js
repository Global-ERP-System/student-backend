const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    enrollment: {
        type : Number,
        required : true
    },
    subjectcode: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model("Assignment",assignmentSchema)