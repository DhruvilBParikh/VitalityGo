'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var DayToDayGoalSchema = mongooseBootstrapper({

    userId: { type: ObjectId, ref:'User'},
    caloriesGoalReached: { type: Boolean},
    waterGoalReached: { type: Boolean },
    totalCalories: {type: Number},
    totalWaterGlasses: {type: Number},
    onDate: { type: Date }

});

mongoose.model('DayToDayGoal', DayToDayGoalSchema, 'dayToDayGoal');
