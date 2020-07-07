const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// as projects are protected resource hence middleware is neccessary
//const requiredLogin = require('../middleware/requirelogin')
const Project = mongoose.model('Project')

//Here i will get a user response it can be a student,teacher or master

router.post('/createproject',(req,res)=>{
    const {title,description,link} = req.body
    if(!title || !description || !link){
        return res.status(422).json({error : "please add all fields"})
    }
    //req.user.password = undefined
    const project = new Project({
        title,
        description,
        link,
        postedBy : req.user
    })
    project.save().then(result=>{
        res.json({project:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
// _id and name are fields in student table 
router.get('/myproject',(req,res)=>{
    Project.find() 
    .then(myproject=>{
        res.json({myproject})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router