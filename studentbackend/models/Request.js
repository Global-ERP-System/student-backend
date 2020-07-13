const mongoose = require('mongoose')

const leaveSchema = mongoose.Schema({

    fromDate : {
        type : Date
    },
    toDate : {
        type: Date
    },
    reason : {
        type : String
    }
})

const certificateSchema = new mongoose.Schema({

    name : {
        type : String
    }
})

const otherDocumentSchema = new mongoose.Schema({
    name : {
        type : String
    }
})

const leave = mongoose.model('Leave', leaveSchema);
const certificate= mongoose.model('Certificate', certificateSchema);
const otherDocument= mongoose.model('OtherDocument', otherDocumentSchema)

module.exports = {  Leave : leave,
                    Certificate : certificate,
                    OtherDocument : otherDocument
                }