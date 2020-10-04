const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000
const appRoot = require('app-root-path')
const mongoose = require('mongoose')
const config = require('config')
require('./utils/mongoose-bootstrapper')
require('./utils/mongoose-connector');


const mongoose1 = require('./utils/mongoose-bootstrapper');
const User = mongoose1.model('User')
const Patient = mongoose1.model('Patient')

app.use(bodyParser.json())

app.post('/',(req, res)=> {
    console.log(req.body)
    var user = new User({
        "email": "dhruvil@gmail.com",
        "firstName": "Dhruvil",
        "lastName": "Parikh"
    })
    user.save()
    
    res.send("Hello")
})
app.get('/', (req, res)=>{
    res.send("Hello")
})

app.listen(PORT,()=>{
    console.log("server running on "+ PORT)
})