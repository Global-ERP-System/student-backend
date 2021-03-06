const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const Student = require('../models/user')

//assuming there is a student table 
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if (!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"})
        }
        const {_id} = payload
        Student.findById(_id).then(userdata =>{
            req.user = userdata
            next()
        })
        
    })
}
