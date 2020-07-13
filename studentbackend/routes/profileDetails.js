const express = require('express');
const router  = express.Router();
const Profile = require('../models/Profile');
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
const multer = require('multer');

const ProfileValidation = data => {
    const schema = Joi.object({
        image : Joi.string(),
        name :  Joi.string(),
        parent_name : Joi.string(),
        reg_no : Joi.string(),
        roll_no : Joi.string(),
        blood_group : Joi.string(),
        campus_code : Joi.string(),
        email : Joi.string().email()
    });
    return schema.validate(data)
}

//This function can be used for user verification. It is not being used right now because the login in page is not ready
function verifyToken(req, res, next) {
    const bearHeader = req.headers['authorization'];

    if(typeof bearHeader !== 'undefined'){
        const bearer = bearHeader.split(' ')

        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else{
        res.sendStatus(403)
    }
}

// API

    //Get all profiles (This is temporary and just for testing)
    router.get('/', async (req,res) => {
        try{
            const profiles = await  Profile.find()
            res.status(200).json(profiles)
        }
        catch(err){
            res.status(400).json({ message: err })
        }
    })

    //Get profile details based on id
    router.get('/:id', async (req,res) => {

        
        const id = req.params.id
        try{
            const profile = await  Profile.findById(id)
            res.status(200).json(profile)
        }
        catch(err){
            res.status(400).json({ message: err })
        }
    });

    

    // This POST API is to add temporary data for testing
    router.post('/add',async (req,res) => {
        console.log(req.body)
        if (!req.body) {
            return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
            });
        }
        const profile = new Profile({
                name : req.body.name,
                parent_name : req.body.parent_name,
                reg_no : req.body.reg_no,
                roll_no : req.body.roll_no,
                blood_group : req.body.blood_group,
                campus_code : req.body.campus_code,
                email : req.body.email
        });

        try{
                const savedProfile = await profile.save();
                res.status(200).json(savedProfile)     
            }
            catch(err){
                res.status(400).json({
                status: 'error',
                error: 'bad request',
                });
            }   
    });

    //storage location of profile photo (It is local for now, can be changed when database is created)
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
        cb(null, './uploads/');
        },
        filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
        }
    });
    
    //file type constaints
    const fileFilter = (req, file, cb) => {
        // reject a file
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
        } else {
        cb(null, false);
        }
    };
    
    // Validations for profile photo
    const upload = multer({
        storage: storage,
        limits: {
        fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });
  
    //Change profile photo
    router.patch('/addPhoto/:id', upload.single('image'),  async (req,res) => {

        try{
            const id = req.params.id;
            const options = { new: true }

            const result = await Profile.findByIdAndUpdate(id, {$set:{image : req.file.path}}, options)

            res.json(result)
        } catch(err){
            res.json({ message: "ERROR" })
        }
    });

    //Delete profile photo (actually setiing it to null so default profile photo can appear)
    router.patch('/deletePhoto/:id', async (req,res) => {
        try{
            const id = req.params.id;
            const options = { new: true }

            const result = await Profile.findByIdAndUpdate(id, {$set: { image : null }}, options)

            res.json(result)
        } catch(err){
            res.json({ message: "Action was not completed" })
        }
    });

    //edit Details
    router.patch('/edit/:id', async (req, res) => {

    //Validation
        const { error } = ProfileValidation(req.body);
        if(error){
            return res.send(error.details[0].message);
        }
        try{
            const id = req.params.id;
            const options = { new: true }
            
            const result = await Profile.findByIdAndUpdate(id, {$set:req.body}, options)

            res.json(result)
        } catch(err){
            res.json({ message: "Action was not completed" })
        }
    });

module.exports = router