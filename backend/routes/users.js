const express = require('express')
const router = express.Router()
const authUtils = require('../utils/jwt-token')
const mongoose = require('../utils/mongoose-bootstrapper');
const User = mongoose.model('User')

router.get('/', authUtils, (req,res)=>{
    console.log(req.user)
    res.send(req.user)
})

module.exports = router

