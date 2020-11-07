const express = require('express')
const mongoose = require('../utils/mongoose-bootstrapper');
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = mongoose.model('User')
const Notification = mongoose.model('Notification')
const config = require('config')

router.get('/:userId/getNotifications', authUtils, (req,res)=>{

    const { userId }= req.params

    Notification.find({user:userId})
    .populate({path:'food',select: ['foodName', 'mealType']}).exec()
    .then(response=>{
        const data = {
            "title": "Successfully fetched",
            "description": response,
            "date": 
        }
        res.status(200).send(JSON.stringify(resp))
    })
    .catch(err=>{
        res.status(401).send(err.message)
    }) 
})

module.exports = router