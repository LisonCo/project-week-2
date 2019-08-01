
const express = require('express');
const app = express();
const hbs = require("hbs");
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use (express.static('public'))
const bodyParser   = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require("connect-mongo")(session);
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// configuring express session
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// defining custom route protection middleware
let protectRoute = function(req, res, next) {
  if(req.session.user) next();
  else {res.redirect("/login")}
}

// attaching session data to res.locals, 
// making it available to all hbs files after this middleware
app.use(function(req,res,next) {
  if(req.session.user) res.locals.user = req.session.user;
  next();
})

// Routes

const home = require('./routes/home');
app.use('/', home);

const profileInfo = require('./routes/auth/profileInfo')
app.use('/', profileInfo)

const logout = require ('./routes/auth/logout')
app.use ('/', logout)

const loginSignup = require('./routes/auth/users');
app.use('/', loginSignup);

const profile = require('./routes/profile')
app.use('/', protectRoute, profile)

const image = require ('./routes/images');
app.use('/', protectRoute, image);

const live = require ('./routes/live');
app.use('/', protectRoute, live)

const menu = require ('./routes/home');
app.use('/', protectRoute, menu)

const glossary = require ('./routes/glossary');
app.use('/', protectRoute, glossary)

const discover = require ('./routes/images');
app.use('/', protectRoute, discover);

module.exports = app;
let port = process.env.PORT || 3000
app.listen(port, ()=>{console.log('App is working on port 3000')})

