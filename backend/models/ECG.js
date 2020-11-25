'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var ECGSchema = mongooseBootstrapper({

    user: {type: ObjectId, ref:'User'},
    ecg: [{type: Number}],
    rate: {type: Number}

});

mongoose.model('ECG', ECGSchema, 'ecg');
