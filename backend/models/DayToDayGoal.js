'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var DayToDaySchema = mongooseBootstrapper({

    user: { type: ObjectId, ref:'User'},
    food: { type: ObjectId, ref:'Food'},
    calories: { type: Number },
    createdAt: { type: Date }

});

mongoose.model('DayToDay', DayToDaySchema, 'dayToDay');
