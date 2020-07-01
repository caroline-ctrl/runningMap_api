## QUICK START
Install dependencies : `npm init ` 
(add in package.json, in the "scripts" object's, under "test" = "start": "nodemon server.js")  
Start Node Server: `npm start`

## INSTALLATION DES DEPENDACES
npm install --dev-save nodemon   
npm install --dev-save body-parser   
npm install --dev-save mongoose   
npm install --dev-save express   


## MODELE
It allows to build the schema of the user. It will be used in the CRUD of controller.
require('mongoose') = for the database
and export the model.


## CONTROLLER
It contains all requests of CRUD
const UserModel = require('../models/User_model') =  it uses the schema to create, get, update and delete a user. All methods are exported for use


## ROUTES
It allows the routing of requests. It consists of the route name's, of the controller name's and of the method name's.
const userController = require('../contoller/user_controller') = it recovers the controller requests's
const express = require('express') = Express is a framework. It allow to easily generate the routes
const router = express.Router() = it constitutes an instance of express. 
module.exports = router;


## APP.JS
Its main function is to build the connection with the mongoDB database. It uses the routes it imported.
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user_routes');
module.exports = app;


## SERVER.JS
It builds the server and listens on port 3000
const app = require('./app');
const http = require('http');