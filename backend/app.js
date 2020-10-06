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


const mongoose = require('./utils/mongoose-bootstrapper');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/users')

// const User = mongoose.model('User')
app.use(bodyParser.json())

app.use(authRoutes)
app.use(userRoutes)

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

// app.post('/',(req, res)=> {
//     console.log(req.body)
//     var user = new User({
//         "email": "dhruvil@gmail.com",
//         "firstName": "Dhruvil",
//         "lastName": "Parikh"
//     })
//     user.save()
    
//     res.send("Hello")
// })
// app.get('/', (req, res)=>{
//     res.send("Hello")
// })

app.listen(PORT,()=>{
    console.log("server running on "+ PORT)
})

module.exports = app;