const express = require('express')
const mongoose = require('../utils/mongoose-bootstrapper');
const authUtils = require('../utils/jwt-token')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = mongoose.model('User')
const Notification = mongoose.model('Notification')
const Request = mongoose.model('Request')
const config = require('config')

router.get('/:userId/getNotifications', authUtils, (req,res)=>{

    const { userId }= req.params

    Notification.find({userId:userId}).exec()
    .then(response=>{
        const resp = {
            "msg": "",
            "data": response
        }
        res.status(200).send(JSON.stringify(resp))
    })
    .catch(err=>{
        res.status(401).send(err.message)
    }) 
})

router.put('/:userId/respondStatus', authUtils, (req,res)=>{
    
    const { toUser, status } = req.body
    const { userId }= req.params

    Request.findOneAndUpdate({toUser:userId, fromUser:toUser},{
        $set:{
            status : status
        }
    }, {new: true}).exec()
    .then(response2=>{
        Notification.create({
            title:'Status Changed',
            createdAt:new Date()
        }).then(response4=>{
            Admin.create({
                user:userId,
                activity: "User changed the status", 
                auditedAt: new Date()
                }).then(response5 =>{
                    console.log("Admin: User changed the status")
                }).catch(err=>{
                    res.status(401).send(err.message)
                })   

            const resp = {
                "msg": "Status successfully changed",
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


router.post('/sendNotification', authUtils, (req,res)=>{
    
    const { toUser, title, description } = req.body

    Notification.create({
        userId: toUser,
        title: title,
        description: description,
        createdAt: new Date()
    })
    .then(response=>{
        Admin.create({
            user:toUser,
            activity: "Admin sent the notification", 
            auditedAt: new Date()
            }).then(response2 =>{
                console.log("Admin: Notification sent to user")
            }).catch(err=>{
                res.status(401).send(err.message)
            })   

        const resp = {
            "msg": "Notification successfully sent",
            "data": { }
        }

        res.status(200).send(JSON.stringify(resp))
    }).catch(err=>{
        res.status(401).send(err.message)
    })
})

module.exports = router