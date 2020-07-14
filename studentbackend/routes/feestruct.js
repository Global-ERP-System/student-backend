const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Feestruct = require('../models/feestruct')
const Feestatus = require('../models/feestruct')

router.post('/pay',(req,res)=>{
    // const {name,enrollment,semester,year,course} = req.body
    // if(!name || !enrollment || !semester || !year || !course){
    //     return res.status(422).json({error : "please add all fields"})
    // }
    // const payfee = new Feestruct({
    //     name, enrollment, semester, year, course,
    //     payedBy: req.user
    // })
    
    // //here instead of displaying successfully payed message we have to make a payment gateway page which will be directed with this pay button.
    // payfee.save()
    // .then(result => {res.json({payfee: result})
    // })
    // .catch(err=>{console.log(err)
    // })




    //this data should be edited by the accounts department 
    const {prevfeestatus,duefeestatus,duefeeamount,lastdateforpayment} = req.body
    if(!prevfeestatus || !duefeestatus || !duefeeamount || !lastdateforpayment){
        return res.status(422).json({error : "please add all fields"})
    }
    const feestatus = new Feestatus({
        prevfeestatus, duefeestatus, duefeeamount, lastdateforpayment,
        payedBy: req.user
    })
    
    feestatus.save()
    .then(output => {res.json({feestatus: output})
    })
    .catch(err=>{console.log(err)
    })
})

// currently it is returning all the data as there is no student data
router.get('/paymentdetails',(req,res)=>{
    // Feestruct.find()
    // .populate('feestatus')
    // .then(paymentdetails => {res.json({paymentdetails})
    // })
    // .catch(err => {console.log(err)})

    // Feestruct.find()
    // .then(paymentdetails => {res.json({paymentdetails})
    // })
    // .catch(err => {console.log(err)})

    Feestatus.find()
    .then(paymentdetails => {res.json({paymentdetails})
    })
    .catch(err => {console.log(err)})
})


module.exports = router
