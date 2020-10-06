const express = require('express')
const router = express.Router()
const authUtils = require('../utils/jwt-token')
const mongoose = require('../utils/mongoose-bootstrapper');
const User = mongoose.model('User')
const Patient = mongoose.model('Patient')
const Admin = mongoose.model('Admin')

router.put('/:userId/addPersonalInfo', authUtils, (req,res)=>{

    const { gender, height, weight, bloodGroup, birthDate, city, state, country} = req.body
    const { userId }= req.params

    User.findByIdAndUpdate(userId,{ $set: {city: city, state: state, country: country, gender: gender }}, { new: true }).exec()
    .then(response=>{
        
        Admin.create({
        user:response._id,
        activity: "User details successfully updated", 
        auditedAt: new Date()
        }).then(res =>{
            console.log("Admin: User details successfully updated")
        })     

        Patient.findOneAndUpdate({userId:response._id},{ $set: 
                {
                    height: height, 
                    weight: weight, 
                    bloodGroup: bloodGroup, 
                    birthDate: birthDate, 
                }
        },{new: true}).exec()
        .then(response2=>{
            const resp = {
                "msg": "Successfully updated",
                "data": { }
            }
            res.status(200).send(JSON.stringify(resp))
        })       
    }).catch(err=>{
        res.status(401).send(err.message)
    })
})

router.get('/:userId/getUserInfo', authUtils, (req,res)=>{
    
    const {userId }= req.params
    // let user = new User({height, weight, bloodGroup, birthDate, city, state, country })
    User.findById(userId).exec()
    .then(response=>{
        Patient.findOne({userId: response._id}).exec()
        .then(response2=> {
            const resp = {
                "msg": "User found successfully",
                "data": { 
                    "id": response._id,
                    "email": response.email,
                    "firstName": response.firstName,
                    "lastName": response.lastName,
                    "gender": response.gender,
                    "type": response.type,
                    "city": response.city,
                    "state": response.state,
                    "country": response.country,
                    "profilePicture": response.profilePicture,
                    "phoneNumber": response.phoneNumber,
                    "height":response2.height, 
			        "weight":response2.weight,
			        "bloodGroup": response2.bloodGroup,
                }
            }
            res.status(200).send(JSON.stringify(resp))
    })
        
            
        }).catch(err=>{
            res.status(401).send(err.message)
        })
    })


router.put('/:userId/editUserInfo', authUtils, (req,res)=>{
    
    const {height, weight, bloodGroup, birthDate, gender, city, state, country, phoneNumber}= req.body
    const {userId }= req.params
    // let user = new User({height, weight, bloodGroup, birthDate, gender, city, state, country, phoneNumber })
    User.findByIdAndUpdate(userId,{ 
        $set: {
            gender: gender, 
            city: city, 
            state: state, 
            country: country, 
            phoneNumber: phoneNumber
        }
    },{new : true}).exec()
    .then(response=>{
        Patient.findByIdAndUpdate({user:response.userId},{
            $set: {
                height: height, 
                weight: weight, 
                bloodGroup: bloodGroup, 
                birthDate: birthDate
            }
        }).exec()
        .then(response2 =>{
            Admin.create({
                user:response._id,
                activity: "User Info updated successfully in Patient and User", 
                auditedAt: new Date()
            }).then(res =>{
                console.log("Admin: User Info updated successfully in Patient and User")
            })
            const resp = {
                "msg": "User Info updated successfully",
                "data": { }
            }
            res.status(200).send(JSON.stringify(resp))

        })

       
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})


module.exports = router

