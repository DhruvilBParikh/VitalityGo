'use strict';

const config = require('config');
const mongoose = require('mongoose');
var isConnectedBefore = false;
var options = {
    keepAlive: 30000,
    auto_reconnect: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

const connect = function () {
    return mongoose.connect(config.app.mongoUrl, options)
        .catch(err => console.error('Mongoose connect(...) failed with err: ', err));
}

connect();

mongoose.connection.on('error', () => {
    console.error('Could not connect to MongoDB')
})

mongoose.connection.on('disconnected', () => {
    console.error('Lost MongoDB connection...')
    if (!isConnectedBefore)
        connect();
})
mongoose.connection.on('connected', () => {
    isConnectedBefore = true;
    console.info('Connection established to MongoDB......')
})

mongoose.connection.on('reconnected', () => {
    console.info('Reconnected to MongoDB.......')
})

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Force to close the MongoDB conection');
        process.exit(0);
    });
});
