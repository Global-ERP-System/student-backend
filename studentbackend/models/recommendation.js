const mongoose = require('mongoose')
const { number } = require('@hapi/joi')
const {ObjectId} = mongoose.Schema.Types

const recommendationSchema = new mongoose.Schema({
    username : {

        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    badges:{
        type : Number,
        required : true
    },
    postedBy : {
        type : ObjectId,
        ref : "Student" //reference to student table
    }
})

mongoose.model("Recommendation",recommendationSchema)