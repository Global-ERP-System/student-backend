const express = require('express');
const router  = express.Router();
const Joi = require ('@hapi/joi');
const {Leave} = require('../models/Request')
const {Certificate} = require('../models/Request')
const {OtherDocument} = require('../models/Request')


router.post('/leave', async (req, res) => {

    const leave = new Leave({
        fromDate : req.body.fromDate,
        toDate : req.body.toDate,
        reason : req.body.reason
    });
    console.log(req.body)
    try{
        const savedLeave = await leave.save();
        res.status(200).json(savedLeave);
    }
    catch(err){
        res.status(400).json(err)
    }

});

router.post('/certificate', async (req, res) => {
    const certificate = new Certificate({
        name : req.body.name
    })

    try{
        const savedCertificate = await certificate.save();
        res.status(200).json(savedCertificate);
    }
    catch(err){
        res.status(400).json(err)
    }
})

router.post('/otherDocument', async (req, res) => {
    const otherDocument = new OtherDocument({
        name : req.body.name
    })

    try{
        const savedDoc = await otherDocument.save();
        res.status(200).json(savedDoc);
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router