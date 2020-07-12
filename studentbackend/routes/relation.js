const express = require('express')
const Profile = require('../models/Profile')
const router = express.Router()
const cors = require('cors')

router.get('/', (req, res) => {

    
    Profile.find(req.query, (err, profile) => {
        if(err){
            res.status(400).send(err)
        }
        else if(!profile.length){
            res.send("No student found.")
        }
        else{
            res.json(profile)
        }
    })
})

module.exports = router;