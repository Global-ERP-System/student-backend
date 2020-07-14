const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Student = mongoose.model("Student")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requirelogin = require('../middleware/requirelogin')

router.post('/signup',(req,res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({error : "please add all fields"})
    }
    Student.findOne({email:email})
    .then(savedUser => {
        if(savedUser){
            return res.status(422).json({error : "User already exists with that email"})
        }

        bcrypt.hash(password,12)
        .then(hashedpassword => {
                const user = new Student({
                    name,
                    email, 
                    password: hashedpassword
                })
                user.save()
                .then(user=>{
                    res.json({message: 'saved successfully'})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error : "please add all fields"})
    }
    Student.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error : "Invalid email or password!!"})
        }

        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message: "successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token:token})
            }
            else{
                return res.status(422).json({error : "Invalid email or password!!"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router