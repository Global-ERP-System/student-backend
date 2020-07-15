const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requirelogin = require('../middleware/requirelogin')
const Project = mongoose.model('Project')

router.post('/createproject',requirelogin,(req,res)=>{
    const {title,description,link} = req.body
    if(!title || !description || !link){
        return res.status(422).json({error : "please add all fields"})
    }

    req.user.password = undefined
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

router.get('/myproject',requirelogin,(req,res)=>{
    Project.find({postedBy: req.user._id})
    .populate('postedBy', '_id name') 
    .then(myproject=>{
        res.json({myproject})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router
