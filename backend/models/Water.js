'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var WaterSchema = mongooseBootstrapper({

    user: {type: ObjectId, ref: 'User' },
    noOfGlasses: { type: Number },
    OnDate: { type: Date }

});

mongoose.model('Water', WaterSchema, 'water');
