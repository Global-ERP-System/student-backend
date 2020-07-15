const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

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
    },
    postedBy: {
        type: ObjectId,
        ref: 'Student'
    }
})

mongoose.model("Assignment",assignmentSchema)