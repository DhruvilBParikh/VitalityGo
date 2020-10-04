'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var FoodSchema = mongooseBootstrapper({

    foodName: {type: String },
    mealType: { type: String },
    defaultCalories: { type: Number }

});

mongoose.model('Food', FoodSchema, 'food');
