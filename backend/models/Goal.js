'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var GoalSchema = mongooseBootstrapper({

    user: { type: ObjectId, ref:'User'},
    caloriesGoal: { type: Number },
    waterGoal: { type: Number }

});

mongoose.model('Goal', GoalSchema, 'goal');
