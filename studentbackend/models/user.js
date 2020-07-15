const mongooose = require('mongoose');

const studentSchema = new mongooose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongooose.model("Student",studentSchema)