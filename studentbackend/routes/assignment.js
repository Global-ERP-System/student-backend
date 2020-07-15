const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Assignment = mongoose.model("Assignment")
const requirelogin = require('../middleware/requirelogin')


// To create the assignment (but there is no button on the front end side to create the assignment)
router.post('/createassignment',requirelogin,(req,res)=>{
    const {name,enrollment,subjectcode,branch,semester,link} = req.body
    if(!name || !enrollment || !subjectcode || !branch || !semester || !link){
        return res.status(422).json({error : "please add all fields"})
    }

    req.user.password = undefined
    const assignment = new Assignment({
        name, 
        enrollment, 
        subjectcode, 
        branch, 
        semester, 
        link,
        postedBy: req.user
    })
    assignment.save().then(result=>{
        res.json({assignment:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myassignment',requirelogin,(req,res)=>{
    Assignment.find({postedBy: req.user._id}) 
    .populate('postedBy','_id name')
    .then(myassignment=>{
        res.json({myassignment})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router
