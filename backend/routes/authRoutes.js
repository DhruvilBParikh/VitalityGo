const express = require('express')
const mongoose = require('../utils/mongoose-bootstrapper');
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = mongoose.model('User')
const Patient = mongoose.model('Patient')
const Doctor = mongoose.model('Doctor')
const Admin = mongoose.model('Admin')
const ECG= mongoose.model('ECG')
const Water = mongoose.model('Water')
const Goal = mongoose.model('Goal')
const DayToDayGoal = mongoose.model('DayToDayGoal')
const config = require('config')

router.post('/signup', async (req,res)=>{

    const {email, firstName, lastName, type, password} = req.body
    console.log(req.body)
    let user = new User({email, firstName, lastName, type, password})
    user.save()
    .then(response=>{
        if(type=='Patient'){
            Patient.create({userId:response._id})
            .then(res => {
                console.log("Patient created")
            })
        }
        else{
            Doctor.create({userId:response._id})
            .then(res => {
                console.log("Doctor created")
            })
        }
        Admin.create({
            user:response._id,
            activity: "User Created", 
            auditedAt: new Date()
        }).then(res =>{
            console.log("User entry updated in admin")
        })
        const token = jwt.sign({userId: response._id}, config.app.jwtSecret)
        res.status(200).send(token)
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.post('/signupWithFB', async (req,res)=>{

    const {email, firstName, lastName, type} = req.body
    let user = new User({email, firstName, lastName, type})
    user.save()
    .then(response=>{
        if(type=='Patient'){
            Patient.create({userId:response._id})
            .then(res => {
                console.log("Patient created")
            })
        }
        else{
            Doctor.create({userId:response._id})
            .then(res => {
                console.log("Doctor created")
            })
        }
        Admin.create({
            user:response._id,
            activity: "User Created", 
            auditedAt: new Date()
        }).then(res =>{
            console.log("User entry updated in admin")
        })
        const token = jwt.sign({userId: response._id}, config.app.jwtSecret)
        res.status(200).send(token)
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.post('/signupWithGoogle', async (req,res)=>{

    const {email, firstName, lastName, type} = req.body
    let user = new User({email, firstName, lastName, type})
    user.save()
    .then(response=>{
        if(type=='Patient'){
            Patient.create({userId:response._id})
            .then(res => {
                console.log("Patient created")
            })
        }
        else{
            Doctor.create({userId:response._id})
            .then(res => {
                console.log("Doctor created")
            })
        }
        Admin.create({
            user:response._id,
            activity: "User Created", 
            auditedAt: new Date()
        }).then(res =>{
            console.log("Admin: User created ")
        })
        const token = jwt.sign({userId: response._id}, config.app.jwtSecret)
        res.status(200).send(token)
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.get('/login', async (req,res)=>{

    const {email, password} = req.body
    console.log(email, password)
    User.findOne({email: email}).exec()
    .then(response=>{

        const token = jwt.sign({userId: response._id}, config.app.jwtSecret)
       
        Admin.create({
            user:response._id,
            activity: "User logged in successfully", 
            auditedAt: new Date()
        }).then(res =>{
            console.log("Admin: User logged in successfully")
        })     

        ECG.findOne({user: response._id}).exec()
        .then(response2=>{
            Goal.findOne({user: response._id}).exec()
            .then(response3=>{
                DayToDayGoal.findOne({user: response._id}).exec()
                .then(response4=>{
                console.log("User Home Page Info")
                const resp = {
                        "token":token,
                        "msg": "Successful login",
                        "data": {
                            "id": response._id,
                            "firstName": response.firstName,
                            "lastName": response.lastName,
                            "caloriesGoal": response3? response3.caloriesGoal : null,
                            "waterGoal": response3 ? response3.waterGoal : null,
                            "currentECG": response2 ? response2.currentECG : null,
                            "currentCaloriesGoal": response4 ? response4.currentCaloriesGoal : null,
                            "currentWaterGoal":  response4 ? response4.currentWaterGoal : null,
                            "caloriesGoalReached": response4 ? response4.caloriesGoalReached : null,
                            "waterGoalReached": response4 ? response4.waterGoalReached : null
                        }
                }
                res.end(JSON.stringify(resp));
            })
        })
        })
        
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.post('/loginWithFB', async (req,res)=>{

    const {email} = req.body
    console.log(email)
    User.findOne({email: email}).exec()
    .then(response=>{

        const token = jwt.sign({userId: response._id}, config.app.jwtSecret)
       
        Admin.create({
            user:response._id,
            activity: "User logged in successfully", 
            auditedAt: new Date()
        }).then(res =>{
            console.log("Admin: User logged in successfully")
        })     

        ECG.findOne({user: response._id}).exec()
        .then(response2=>{
            Goal.findOne({user: response._id}).exec()
            .then(response3=>{
                DayToDayGoal.findOne({user: response._id}).exec()
                .then(response4=>{
                console.log("User Home Page Info")
                const resp = {
                        "token":token,
                        "msg": "Successful login",
                        "data": {
                            "id": response._id,
                            "firstName": response.firstName,
                            "lastName": response.lastName,
                            "caloriesGoal": response3.caloriesGoal ? response3.caloriesGoal : null,
                            "waterGoal": response3.waterGoal ? response3.caloriesGoal : null,
                            "currentECG": response2.currentECG,
                            "currentCaloriesGoal": response4 ? response4.currentCaloriesGoal : null,
                            "currentWaterGoal":  response4 ? response4.currentWaterGoal : null,
                            "caloriesGoalReached": response4 ? response4.caloriesGoalReached : null,
                            "waterGoalReached": response4 ? response4.waterGoalReached : null
                        }
                }
                res.end(JSON.stringify(resp));
            })
        })
        })
        
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.post('/loginWithGoogle', async (req,res)=>{

    const {email} = req.body
    console.log(email)
    User.findOne({email: email}).exec()
    .then(response=>{

        const token = jwt.sign({userId: response._id}, config.app.jwtSecret)
       
        Admin.create({
            user:response._id,
            activity: "User logged in successfully", 
            auditedAt: new Date()
        }).then(res =>{
            console.log("Admin: User logged in successfully")
        })     

        ECG.findOne({user: response._id}).exec()
        .then(response2=>{
            Goal.findOne({user: response._id}).exec()
            .then(response3=>{
                DayToDayGoal.findOne({user: response._id}).exec()
                .then(response4=>{
                console.log("User Home Page Info")
                const resp = {
                        "token":token,
                        "msg": "Successful login",
                        "data": {
                            "id": response._id,
                            "firstName": response.firstName,
                            "lastName": response.lastName,
                            "caloriesGoal": response3.caloriesGoal ? response3.caloriesGoal : null,
                            "waterGoal": response3.waterGoal ? response3.caloriesGoal : null,
                            "currentECG": response2.currentECG,
                            "currentCaloriesGoal": response4 ? response4.currentCaloriesGoal : null,
                            "currentWaterGoal":  response4 ? response4.currentWaterGoal : null,
                            "caloriesGoalReached": response4 ? response4.caloriesGoalReached : null,
                            "waterGoalReached": response4 ? response4.waterGoalReached : null
                        }
                }
                res.end(JSON.stringify(resp));
            })
        })
        })
        
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

module.exports = router