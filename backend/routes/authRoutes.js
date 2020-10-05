const express = require('express')
const mongoose = require('../utils/mongoose-bootstrapper');
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = mongoose.model('User')
const config = require('config')

router.post('/signup', async (req,res)=>{

    const {email, firstName, lastName} = req.body
    let user = new User({email, firstName, lastName})
    user.save()
    .then(response=>{
        const token = jwt.sign({userId: response._id}, config.app.jwtSecret)
        res.status(200).send(token)
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

module.exports = router