const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Assignment = require('../models/assignment')


// To create the assignment (but there is no button on the front end side to create the assignment)
router.post('/createassignment',(req,res)=>{
    const {name,enrollment,subjectcode,branch,semester,link} = req.body
    if(!name || !enrollment || !subjectcode || !branch || !semester || !link){
        return res.status(422).json({error : "please add all fields"})
    }
    const assignment = new Assignment({
        name, enrollment, subjectcode, branch, semester, link
    })
    assignment.save().then(result=>{
        res.json({assignment:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

// currently it is returning all the data as there is no student data
router.get('/myassignment',(req,res)=>{
    Assignment.find() 
    .then(myassignment=>{
        res.json({myassignment})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router
