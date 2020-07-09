const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// as projects are protected resource hence middleware is neccessary
//const requiredLogin = require('../middleware/requirelogin')
const Internship = mongoose.model('Internship')
const InternshipData = mongoose.model('InternshipData')

//Here i will get a user response it can be a student,teacher or master

router.post('/createinternship',(req,res)=>{
    const {currentlyavailable, preference, skills, cv} = req.body
    if(!currentlyavailable || !preference || !skills || !cv){
        return res.status(422).json({error : "please add all fields"})
    }
    //req.user.password = undefined
    const internshipData = new InternshipData({
        currentlyavailable,
        preference,
        skills,
        cv,
        postedBy : req.user
    })
    internshipData.save().then(result=>{
        res.json({internshipdata:result})
    })
    .catch(err=>{
        console.log(err)
    })

    const {nameofthecompany, position, startingdate, enddate} = req.body
    if(!nameofthecompany || !position || !startingdate || !enddate){
        return res.status(422).json({error : "please add all fields"})
    }
    //req.user.password = undefined
    const internship = new Internship({
        nameofthecompany,
        position,
        startingdate,
        enddate,
        postedBy : req.user
    })
    internship.save().then(result=>{
        res.json({internship:result})
    })
    .catch(err=>{
        console.log(err)
    })    
})
// _id and name are fields in student table 
router.get('/myinternship',(req,res)=>{
    Internship.find() 
    .then(myinternship=>{
        res.json({myinternship})
    })
    .catch(err=>{
        console.log(err)
    })
    InternshipData.find() 
    .then(myinternship=>{
        res.json({myinternship})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router