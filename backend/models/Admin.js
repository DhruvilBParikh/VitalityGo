'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var AdminSchema = mongooseBootstrapper({

    user: {type: ObjectId, ref: 'User' },
    activity: { type: String },
    auditedAt: { type: Date }

});

mongoose.model('Admin', AdminSchema, 'admin');
