'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var PatientSchema = mongooseBootstrapper({

    userId: {type: ObjectId, ref:'User'},
    weight: {type: Number},
    height: {type: Number},
    bloodGroup: {type: String},
    birthdate: {type: Date},
    emergencyContacts: [{type:ObjectId, ref:'User'}],
    doctors: [{type:ObjectId, ref:'User'}]

});

mongoose.model('Patient', PatientSchema, 'patient');