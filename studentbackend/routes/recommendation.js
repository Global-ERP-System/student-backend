const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// as projects are protected resource hence middleware is neccessary
//const requiredLogin = require('../middleware/requirelogin')
const Recommendation = mongoose.model('Recommendation')

//Here i will get a user response it can be a student,teacher or master

router.post('/createrecommendation',(req,res)=>{
    const {username,message,badges} = req.body
    if(!username || !message || !badges){
        return res.status(422).json({error : "please add all fields"})
    }
    // Here we have to put logic to check if the username exists in student data which point to unique student
    //instead of username we should something like enrollment no. or something unique
    if(true){//replace true if username exist
        //req.user.password = undefined
        const recommendation = new Recommendation({
            username,
            message,
            badges,
            postedBy : req.user
        })
        recommendation.save().then(result=>{
            res.json({Recommendation:result})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    else{
        return res.status(422).json({error : "Username Don't exist"})
    }
})
// currently it is returning all the data as there is no student data
router.get('/myrecommendation',(req,res)=>{
    Recommendation.find() 
    .then(myRecommendation=>{
        res.json({myRecommendation})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router
