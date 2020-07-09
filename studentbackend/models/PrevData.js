const mongoose  = require('mongoose');

const prevDataSchema = new mongoose.Schema({
    graduation : {
        type : String,
         
    },
    senior_secondary_school : {
        type : String,
         
    },
    stream : {
        type : String,
         
    },
    senior_secondary_school_board : {
        type : String,
         
    },
    senior_secondary_school_cgpa : {
        type : Number,
         
    },
    secondary_school : {
        type : String,
         
    },
    secondary_school_board : {
        type : String,
         
    },
    secondary_school_cgpa : {
        type : Number,
         
    },
    diploma_course : {
        tyoe : String
    }
})

module.exports = mongoose.model('Prevdata', prevDataSchema)