const express = require('express')
const router = express.Router()
const authUtils = require('../utils/jwt-token')
const mongoose = require('../utils/mongoose-bootstrapper');
const User = mongoose.model('User')
const Patient = mongoose.model('Patient')
const Admin = mongoose.model('Admin')
const Goal = mongoose.model('Goal')
const DayToDayGoal = mongoose.model('DayToDayGoal')
const Doctor = mongoose.model('Doctor')
const Request = mongoose.model('Request')
const Notification = mongoose.model('Notification')

router.put('/:userId/addPersonalInfo', authUtils, (req,res)=>{

    const { gender, height, weight, bloodGroup, birthDate, city, state, country} = req.body
    const { userId }= req.params

    User.findByIdAndUpdate(userId,{ $set: {city: city, state: state, country: country, gender: gender }}, { new: true }).exec()
    .then(response=>{
        
        Patient.findOneAndUpdate({userId:response._id},{ $set: 
                {
                    height: height, 
                    weight: weight, 
                    bloodGroup: bloodGroup, 
                    birthDate: birthDate, 
                }
        },{new: true}).exec()
        .then(response2=>{

            Admin.create({
                user:response._id,
                activity: "User details successfully updated", 
                auditedAt: new Date()
                }).then(res =>{
                    console.log("Admin: User details successfully updated")
                }).catch(err=>{
                    res.status(401).send(err.message)
                })   

            const resp = {
                "msg": "Successfully updated",
                "data": { }
            }

            res.status(200).send(JSON.stringify(resp))
        }).catch(err=>{
            res.status(401).send(err.message)
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
        }).catch(err=>{
        res.status(401).send(err.message)
        })        
            
        }).catch(err=>{
            res.status(401).send(err.message)
        })
    })


router.put('/:userId/editUserInfo', authUtils, (req,res)=>{
    
    const {height, weight, bloodGroup, birthDate, gender, city, state, country, phoneNumber}= req.body
    const {userId}= req.params
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
        
        Patient.findOneAndUpdate({userId:response._id},{
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
            }).catch(err=>{
                res.status(401).send(err.message)
            })

            const resp = {
                "msg": "User Info updated successfully",
                "data": { }
            }
            res.status(200).send(JSON.stringify(resp))

        }).catch(err=>{
        res.status(401).send(err.message)
    })
       
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.put('/:userId/editProfilePicture', authUtils, (req,res)=>{
    
    console.log("TBD")
})

router.put('/:userId/setGoal', authUtils, (req,res)=>{

    const {caloriesGoal, waterGoal} = req.body
    const {userId} = req.params

    // let goal = new Goal({caloriesGoal, waterGoal})
    Goal.findOneAndUpdate({userId : userId},{$set:{
        caloriesGoal: caloriesGoal, 
        waterGoal: waterGoal}},{new: true}
     ).exec()
    .then(response=>{
        Admin.create({
            user:response._id,
            activity: "User Goal successfully changed", 
            auditedAt: new Date()
            }).then(res =>{
                console.log("Admin: User Goal successfully changed")
            }).catch(err=>{
                res.status(401).send(err.message)
            })   

        const resp = {
            "msg": "Goal successfully changed",
            "data": response
        }

        res.status(200).send(JSON.stringify(resp))
        
    }).catch(err=>{
        res.status(401).send(err.message)
    })
})

router.get('/:userId/getGoal', authUtils, (req,res)=>{

    const {userId} = req.params

    Goal.findOne({userId : userId}).exec()
    .then(response=>{

        const resp = {
            "msg": "",
            "data": {
                caloriesGoal: response.caloriesGoal,
                waterGoal: response.waterGoal
            }
        }

        res.status(200).send(JSON.stringify(resp))        
    }).catch(err=>{
        res.status(401).send(err.message)
    })
})

router.post('/initializeEachDayGoal', async (req,res)=>{

    User.find()
    .then(response=>{
        response.forEach(user=>{            
            let dayToDayGoal = new DayToDayGoal({user: user._id, caloriesGoalReached:Boolean(false), waterGoalReached:Boolean(false), totalCalories:0, totalWaterGlasses:0, onDate:new Date()})
            dayToDayGoal.save()
            .then(response1=>{
                const resp = {
                    "msg": "DayToDayGoal Successfully updated",
                    "data": { }
                }    
                res.status(200).send(JSON.stringify(resp))
            }).catch(err=>{
                res.status(401).send(err.message)
            })
        })        
       
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.put('/:userId/updateDaytoDayGoal', authUtils, (req,res)=>{
    
    const {totalCalories, totalWaterGlasses}= req.body
    const {userId}= req.params
    
    Goal.findOne({userId: userId}).exec()
    .then(response=>{
        DayToDayGoal.findOne({userId: userId}).exec()
        .then(response1=>{
            console.log("Update Day to day goal", response1)
            let total_Calories= response1.totalCalories+totalCalories
            let total_waterGlasses= response1.totalWaterGlasses+totalWaterGlasses
            let caloriesGoalReached= total_Calories >= response.caloriesGoal 
            let waterGoalReached= total_waterGlasses >= response.waterGoal 

            DayToDayGoal.findByIdAndUpdate(response1._id,{ $set:
                {
                    caloriesGoalReached: caloriesGoalReached,
                    waterGoalReached: waterGoalReached,
                    totalCalories: total_Calories,
                    totalWaterGlasses: total_waterGlasses
                }
            },{new: true}).exec()
            .then(response2 =>{

                Admin.create({
                    user:response._id,
                    activity: "User DayToDayGoal successfully updated", 
                    auditedAt: new Date()
                    }).then(result =>{
                        console.log("Admin: User DayToDayGoal  successfully updated")
                    }).catch(err=>{
                        res.status(401).send(err.message)
                    })   
    
                const resp = {
                    "msg": "Successfully updated",
                    "data": { }
                }
    
                res.status(200).send(JSON.stringify(resp))

            }).catch(err=>{
                res.status(401).send(err.message)
            }) 


    }).catch(err=>{
        res.status(401).send(err.message)
    }) 
}).catch(err=>{
    res.status(401).send(err.message)
})    

})

router.get('/:userId/getDaytoDayGoal', authUtils, (req,res)=>{
    
    const {onDate}= req.body
    const {userId}= req.params
 
    DayToDayGoal.findOne({userId: userId, onDate: {$gte: new Date(onDate)}}).exec()
        .then(response=>{
            //console.log("getDaytoDayGoal", response)
            if(response.length===0) {
                let dayToDayGoal = new DayToDayGoal({userId: userId, caloriesGoalReached:Boolean(false), waterGoalReached:Boolean(false), totalCalories:0, totalWaterGlasses:0, onDate:new Date()})
                dayToDayGoal.save()
                .then(response=>{
                    const resp = {
                        "msg": "DayToDayGoal details created successfully",
                        "data": {
                                "caloriesGoalReached": response.caloriesGoalReached,
                                "waterGoalReached": response.waterGoalReached,
                                "totalCalories": response.totalCalories,
                                "totalWaterGlasses": response.totalWaterGlasses
                             }
                        }    
                    res.status(200).send(JSON.stringify(resp))
                })
                .catch(err=>{
                    res.status(401).send(err.message)
                })
            } else {
                const resp = {
                    "msg": "DayToDayGoal details found successfully",
                    "data": {
                            "caloriesGoalReached": response.caloriesGoalReached,
                            "waterGoalReached": response.waterGoalReached,
                            "totalCalories": response.totalCalories,
                            "totalWaterGlasses": response.totalWaterGlasses
                         }
                    }    
                res.status(200).send(JSON.stringify(resp))
            }
            
        }).catch(err=>{
            res.status(401).send(err.message)
   })   
})

router.get('/:userId/getECG', authUtils, (req,res)=>{
    
        
})

router.put('/:userId/addWaterGlass', authUtils, (req,res)=>{
    
    const {noOfGlasses, onDate}= req.body
    const {userId}= req.params
    console.log(req.body)
    DayToDayGoal.findOne({user: userId, onDate: {$gte: new Date(onDate)}}).exec()
    .then(response=>{
        let total_water_glasses = response.totalWaterGlasses+noOfGlasses
        DayToDayGoal.findByIdAndUpdate(response._id,{$set:
            {
                totalWaterGlasses: total_water_glasses
            }
        }).exec()
        .then(response1=>{
            Admin.create({

                user:response._id,
                activity: "Water successfully updated", 
                auditedAt: new Date()
                }).then(result =>{
                    console.log("Admin: Water successfully updated")
                }).catch(err=>{
                    res.status(401).send(err.message)
                })   

            const resp = {
                "msg": "Successfully updated",
                "data": { }
            }

            res.status(200).send(JSON.stringify(resp))

    }).catch(err=>{
        res.status(401).send(err.message)
    }) 
}).catch(err=>{
    res.status(401).send(err.message)
})    

})

router.get('/:userId/:onDate/getWaterGlass', authUtils, (req,res)=>{
    
    const {userId, onDate}= req.params
    console.log(req.params)
    DayToDayGoal.findOne({user: userId, onDate: {$gte: new Date(onDate)}}).exec()
        .then(response=>{
            //console.log("getDaytoDayGoal", response)
            const resp = {
                "msg": "Successfully fetched",
                "data": {
                        "noOfClasses": response.totalWaterGlasses
                     }
                }    
            res.status(200).send(JSON.stringify(resp))
        }).catch(err=>{
            res.status(401).send(err.message)
   })   
})

router.put('/:userId/addEmergencyContact', authUtils, (req,res)=>{
    
    const { name, phoneNumber, email, message} = req.body
    const { userId }= req.params

    let user = new User({email, name, phoneNumber})

    user.save()
    .then(response=>{
        Patient.findOneAndUpdate({userId:userId},{
            $push:{
                emergencyContacts : response._id
            }
        }, {new: true}).exec()
        .then(response2=>{
            Request.create({
                fromUser:userId,
                toUser: response._id,
                status:'pending',
                updatedAt: new Date()
            }).then(response3=>{
                Notification.create({
                    userId:response._id,
                    title:'Add Emergency Contact Request',
                    description:message,
                    createdAt:new Date()
                }).then(response4=>{
                    Admin.create({
                        user:userId,
                        activity: "User added emergency contact", 
                        auditedAt: new Date()
                        }).then(res =>{
                            console.log("Admin: User details successfully updated")
                        }).catch(err=>{
                            res.status(401).send(err.message)
                        })   
        
                    const resp = {
                        "msg": "Successfully requested",
                        "data": { }
                    }

                    res.status(200).send(JSON.stringify(resp))
                }).catch(err=>{
                    res.status(401).send(err.message)
                })
            }).catch(err=>{
                res.status(401).send(err.message)
            })
        }).catch(err=>{
            res.status(401).send(err.message)
        })
    }).catch(err=>{
        res.status(401).send(err.message)
    })
})


router.get('/:userId/getEmergencyContacts', authUtils, (req,res)=>{
    
    const {userId}= req.params

    Patient.findOne({user: userId})
    .populate({path:'emergencyContacts', select: ['firstName', 'phoneNumber', 'profilePicture']})
    .exec()
        .then(response=>{
            const resp = {
                "msg": "Successfully fetched",
                "data": response
                }    
            res.status(200).send(JSON.stringify(resp))
        }).catch(err=>{
            res.status(401).send(err.message)
   })   
})

router.put('/:userId/addDoctor', authUtils, (req,res)=>{
    
    const { toUser } = req.body
    const { userId }= req.params

    Patient.findOneAndUpdate({userId:userId},{
        $push:{
            doctors : toUser
        }
    }, {new: true}).exec()
    .then(response2=>{
        Doctor.findOneAndUpdate({userId:toUser},{
            $push:{
                patients: userId
            }
        }, {new: true}).exec()
        .then(response5=>{
            Request.create({
                fromUser:userId,
                toUser: toUser,
                status:'pending',
                updatedAt: new Date()
            }).then(response3=>{
                Notification.create({
                    userId:toUser,
                    title:'Add Doctor Request',
                    createdAt:new Date()
                }).then(response4=>{
                    Admin.create({
                        user:userId,
                        activity: "User added doctor", 
                        auditedAt: new Date()
                        }).then(res =>{
                            console.log("Admin: User details successfully updated")
                        }).catch(err=>{
                            res.status(401).send(err.message)
                        })   
        
                    const resp = {
                        "msg": "Successfully requested",
                        "data": { }
                    }
    
                    res.status(200).send(JSON.stringify(resp))
                }).catch(err=>{
                    res.status(401).send(err.message)
                })
            }).catch(err=>{
                res.status(401).send(err.message)
            })
        }).catch(err=>{
            res.status(401).send(err.message)
        })
    }).catch(err=>{
        res.status(401).send(err.message)
    })

})

router.get('/:userId/getDoctors', authUtils, (req,res)=>{
    
    const {userId}= req.params

    Doctor.findOne({user: userId})
    .populate({path:'patients', select: ['firstName', 'phoneNumber', 'profilePicture']})
    .exec()
        .then(response=>{
            const resp = {
                "msg": "Successfully fetched",
                "data": response
                }    
            res.status(200).send(JSON.stringify(resp))
        }).catch(err=>{
            res.status(401).send(err.message)
   })   
})

module.exports = router
