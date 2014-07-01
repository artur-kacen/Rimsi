
/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    mongoose = require('mongoose');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log("Node environment: " + process.env.NODE_ENV);
var config = require('./config/config');

var http = require('http');
//var path = require('path');
var auth = require('./config/middlewares/authorization');

//Bootstrap db connection
var db = mongoose.connect(config.db);

//Bootstrap models
var models_path = __dirname + '/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

//bootstrap passport config
require('./config/passport')(passport);

var app = express();

//express settings
require('./config/express')(app, passport, db);

//
//var email_client = require('./config/mail-listner')();

//Bootstrap routes
require('./config/routes')(app, passport, auth);

//Start the app by listening on <port>
app.listen(config.port);
console.log('Express app started on port ' + config.port);

//expose app
exports = module.exports = app;
