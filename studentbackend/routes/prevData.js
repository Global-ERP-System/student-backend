const express = require('express');
const router  = express.Router();
const Prevdata = require('../models/PrevData');
const isAuthorised = require('../middleware/requirelogin')
const Joi = require ('@hapi/joi');

const prevDataValidation = data => {
    const schema = Joi.object({
        graduation : Joi.string(),
        senior_secondary_school : Joi.string(),
        stream : Joi.string(),
        senior_secondary_school_board : Joi.string(),
        senior_secondary_school_cgpa : Joi.number(),
        secondary_school : Joi.string(),
        secondary_school_cgpa : Joi.number(),
        diploma_course : Joi.string()

        // graduation,
        // senior_secondary_school,
        // stream,
        // senior_secondary_school_board,
        // senior_secondary_school_cgpa,
        // secondary_school,
        // diploma_course

    });
    return schema.validate(data)
}

    //Get Prev Data of all students (This is temporary and just for testing)
    router.get('/', isAuthorised, async (req, res) => {

        try{
            const prevData = await Prevdata.find();
            res.status(200).json(prevData)
        }
        catch(err){
            res.status(400).json({ message : err })
        }
    })

    //Get Prev Data details based on id
    router.get('/:id', isAuthorised, async (req, res) => {
        const id = req.params.id;

        try{
            const prevData = await Prevdata.findById(id);
            res.status(200).json(prevData)
        }
        catch(err){
            res.status(400).json({ message : err })
        }
    })

    // This POST API is to add temporary data for testing
    router.post('/addPrevData', async (req,res) => {

        const { error } = prevDataValidation(req.body);
        if(error){
            return res.send(error.details[0].message);
        }

        const prevData = new Prevdata({
            graduation : req.body.graduation,
            senior_secondary_school : req.body.senior_secondary_school,
            stream : req.body.stream,
            senior_secondary_school_board: req.body.senior_secondary_school_board,
            secondary_school : req.body.secondary_school,
            senior_secondary_school_cgpa : req.body.senior_secondary_school_cgpa,
            secondary_school : req.body.secondary_school,
            diploma_course : req.body.diploma_course
    });

    try{
        const savedPrevData = await prevData.save();
        res.status(200).json(savedPrevData);
    }
    catch(err){
        res.status(400).json({
            status: 'error',
            error: err,
        })
    }
        
    });

        //edit Previous Data
    router.patch('/edit/:id', isAuthorised, async (req,res) => {

        //Validation
        const { error } = prevDataValidation(req.body);
        if(error){
            return res.send(error.details[0].message);
        }
        
        try{
            const id = req.params.id;
            const options = { new: true }
            const result = await Prevdata.findByIdAndUpdate(id, {$set:req.body}, options)

            res.json(result)
        } catch(err){
            res.status(400).json({
                status: 'error',
                error: err,
            })
        }
    });

    module.exports = router