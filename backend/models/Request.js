'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var RequestSchema = mongooseBootstrapper({

    fromUser: {type: ObjectId, ref:'User'},
    toUser: {type: ObjectId, ref:'User'},
    status: {type: String, enum: ['pending', 'declined', 'approved'] },
    updatedAt: {type: Date}

});

mongoose.model('Request', RequestSchema, 'request');