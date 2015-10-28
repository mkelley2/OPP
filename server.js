var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
// var pgconfig = require('./config');
var pg = require('pg');
// var db = require('orchestrate')(config.dbkey);

var logger = require('morgan');
var partials = require('express-partials');
var util = require('util');
var session = require('express-session');
var methodOverride = require('method-override');
var passport = require('passport');

var routes = require('./routes/index');
// var users = require('./routes/user');

var app = express();

var port = process.env.PORT || 3000;


app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
// 
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat', saveUninitialized: false, proxy: true, resave: true }));

app.use('/', routes);
// app.use('/users', users);


// app.use(partials());
app.use(logger('dev'));

// app.use(methodOverride());
// app.use(session({ secret: 'keyboard cat', saveUninitialized: false, proxy: true, resave: true }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());


// app.use('/', routes);

var server = app.listen(port, function () {
  console.log("Server is running on port 3000...");
});

module.exports = server;
