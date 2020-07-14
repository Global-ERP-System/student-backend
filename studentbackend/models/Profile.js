const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    image : {
        type : String,
        required : false,
        default : null
    },
    name: {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true  
    },
    parent_name: {
        type : String,
        required : true
    },
    college : {
        type : String,
        required : true
    },
    batch : {
        type : String,
        required : true
    },
    discipline : {
        type : String,
        required : true  
    },
    reg_no: {
        type : String,
        required : true
    },
    roll_no: {
        type : String,
        required : true
    },
    blood_group: {
        type : String,
        required : true
    },
    campus_code: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    connections : []
})

module.exports = mongoose.model('Profile', ProfileSchema)