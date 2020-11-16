const express = require('express')
const bodyParser = require('body-parser')
var path = require('path');
const app = express()
const PORT = 3000
const appRoot = require('app-root-path')
const cors = require('cors')
// const mongoose = require('mongoose')
const config = require('config')
require('./utils/mongoose-bootstrapper')
require('./utils/mongoose-connector');


app.use(cors())

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/users')
const foodRoutes = require('./routes/food')
const notificationRoutes = require('./routes/notifications')

app.use(bodyParser.json())

app.use(authRoutes)
app.use(userRoutes)
app.use(foodRoutes)
app.use(notificationRoutes)  

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