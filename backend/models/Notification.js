'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var NotificationSchema = mongooseBootstrapper({

    title: {type: String},
    description: { type: String },
    createdAt: { type: Date },
    seenAt: { type: Date }

});

mongoose.model('Notification', NotificationSchema, 'notification');
