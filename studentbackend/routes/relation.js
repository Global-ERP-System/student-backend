const express = require('express')
const Profile = require('../models/Profile')
const router = express.Router()
const cors = require('cors')


//Search results and Connection list
router.get('/:id', async (req, res) => {

    const my_id = req.params.id

//Search list
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

//on Clicking Connect
router.patch('/connect/:id', async (req, res) => {

    try{
        const search_id = req.body.id;
        const my_id = req.params.my_id
        const options = { new : true }
        const connected = await Profile.findByIdAndUpdate(my_id, {$push :{ connections : search_id} }, options);
        res.status(200).json(connected)
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router;