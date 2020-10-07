'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var DoctorSchema = mongooseBootstrapper({

    userId: {type: ObjectId, ref:'User'},
    birthDate: {type: Date},
    patients: [{type:ObjectId, ref:'User'}]
    
});

mongoose.model('Doctor', DoctorSchema, 'doctor');