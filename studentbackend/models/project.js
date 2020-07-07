const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const projectSchema = new mongoose.Schema({
    title : {

        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    link : {
        type: String,
        required : true
    },
    postedBy : {
        type : ObjectId,
        ref : "student" //reference to student table
    }
})

mongoose.model("Project",projectSchema)