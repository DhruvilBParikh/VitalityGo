const mongoose = require('./mongoose-bootstrapper')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const config = require('config')

module.exports = (req, res, next)=> {
    // console.log("JWT TOKEN")
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).send({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, config.app.jwtSecret, async (err, payload) => {
        if(err){
            res.status(401).send({error:"You must be logged in"})
        }
        const {userId} = payload
        User.findById(userId)
        .then(response=>{
            req.user = response
            next()
        })
    
    })
}