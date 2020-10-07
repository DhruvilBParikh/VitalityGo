'use strict';

var mongooseBootstrapper = require('../utils/mongoose-model-bootstrapper');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

var UserSchema = mongooseBootstrapper({

    email: {
        type: String,
        unique: true
    },
    phoneNumber: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    type: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String},
    profilePicture: { type: String },
    signedInFrom: { type: String, enum: ['email', 'google', 'facebook'] },
    verified: { type: Boolean },
    verifiedAt: { type: Date },
    deleted: { type: Boolean },
    deletedAt: { type: Date }

});

mongoose.model('User', UserSchema, 'user');
