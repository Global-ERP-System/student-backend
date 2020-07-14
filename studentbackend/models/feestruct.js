const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const feeSchema = new mongoose.Schema({
    // name:{
    //     type: String,
    //     required: true
    // },
    // enrollment:{
    //     type: Number,
    //     required: true
    // },
    // semester:{
    //     type: Number,
    //     required: true
    // },
    // year:{
    //     type: Number,
    //     required: true
    // },
    // course:{
    //     type: String,
    //     required: true
    // },
    payedBy : {
        type : ObjectId,
        ref : "Student" //reference to student table
    }
    // feeStatus: [{
    //     type : ObjectId,
    //     ref : "Account" //reference to account department
    // }]
})

const accountdeptfeeSchema = new mongoose.Schema({
    prevfeestatus:{
        type: String,
        required: true
    },
    duefeestatus:{
        type: String,
        required: true
    },
    duefeeamount:{
        type: Number,
        required: true
    },
    lastdateforpayment:{
        type: Number,
        required: true
    },
    payedBy : {
        type : ObjectId,
        ref : "Student" //reference to student table
    }
})

module.exports = mongoose.model("Feestruct",feeSchema)
module.exports = mongoose.model("Feestatus",accountdeptfeeSchema)