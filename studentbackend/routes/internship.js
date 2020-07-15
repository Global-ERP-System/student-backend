const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requirelogin = require('../middleware/requirelogin')
const Internship = mongoose.model('Internship')
const InternshipData = mongoose.model('InternshipData')


router.post('/createinternship',requirelogin,(req,res)=>{
    const {nameofthecompany, position, startingdate, enddate} = req.body
    if(!nameofthecompany || !position || !startingdate || !enddate){
        return res.status(422).json({error : "please add all fields"})
    }

    req.user.password = undefined
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
router.get('/myinternship',requirelogin,(req,res)=>{
    Internship.find({postedBy: req.user._id}) 
    .populate('postedBy','_id name')
    .then(myinternship=>{
        res.json({myinternship})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router