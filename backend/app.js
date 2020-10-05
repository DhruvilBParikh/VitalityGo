const express = require('express')
const bodyParser = require('body-parser')
var path = require('path');
const app = express()
const PORT = 3000
const appRoot = require('app-root-path')
// const mongoose = require('mongoose')
const config = require('config')
require('./utils/mongoose-bootstrapper')
require('./utils/mongoose-connector');

const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.json())

app.use(authRoutes)

var routesDirectory = config.app.routesDirectory;
if (routesDirectory) {
    routesDirectory = appRoot + routesDirectory;
} else {
    routesDirectory = path.join(__dirname, 'routes');
}

var routes = config.app.routes;

// routes
for (var i = 0; i < routes.length; i++) {
    var routeObject = routes[i];
    var p = path.join(routesDirectory, routeObject.file);
    app.use(routeObject.basePath, require(p));
}

app.listen(PORT,()=>{
    console.log("server running on "+ PORT)
})

module.exports = app;