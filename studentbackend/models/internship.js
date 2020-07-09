const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const internshipDataSchema = new mongoose.Schema({
    currentlyavailable : {
        type: Boolean,
        required : true
    },
    preference : {
    
        type: String,
        required : true
    },
    skills : {
        type : String,
        required : true
    },
    cv : {
        type: String,
        required : true
    },
    postedBy : {
        type : ObjectId,
        ref : "student" //reference to student table
    }
})


const internshipSchema = new mongoose.Schema({
    
    nameofthecompany : {
        type: String,
        required : true
    },
    position : {
        type: String,
        required : true
    },
    startingdate : {
        type: Date,
        required : true
    },
    enddate : {
        type: Date,
        required : true
    },
    postedBy : {
        type : ObjectId,
        ref : "Student" //reference to student table
    }
})


mongoose.model("Internship",internshipSchema)
mongoose.model("InternshipData",internshipDataSchema)