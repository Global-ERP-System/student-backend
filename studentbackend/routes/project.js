const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// as projects are protected resource hence middleware is neccessary
const requiredLogin = require('../middleware/requirelogin')
const Project = mongoose.model('Project')

//Here i will get a user response it can be a student,teacher or master

router.post('/createproject',requiredLogin,(req,res)=>{
    const {title,description,link} = req.body
    if(!title || !description || !link){
        return res.status(422).json({error : "please add all fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        description,
        link,
        postedBy : req.user
    })
    post.save().then(result=>{
        res.json({project:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
// _id and name are fields in student table 
router.get('/myproject',requiredLogin,(req,res)=>{
    Post.find({postedBy : req.user._id})
    .populate("postedBy","_id name") 
    .then(myproject=>{
        res.json({myproject})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router