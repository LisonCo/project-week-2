
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

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost/project-week-2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// configuring express session
app.use(session({
  secret: 'super secret',
  resave: true,
  saveUninitialized: false,
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// attaching session data to res.locals, 
// making it available to all hbs files after this middleware
app.use(function(req,res,next) {
  if(req.session.user) res.locals.user = req.session.user;
  next();
})

// Routes

const home = require('./routes/home');
app.use('/', home);

const discover = require ('./routes/images');
app.use('/', discover);

const loginSignup = require('./routes/auth/users');
app.use('/', loginSignup);

const profileInfo = require('./routes/auth/profileInfo')
app.use('/', profileInfo)

const profile = require('./routes/profile')
app.use('/', profile)

const image = require ('./routes/images');
app.use('/', image);

const live = require ('./routes/live');
app.use('/', live)

const menu = require ('./routes/home');
app.use('/', menu)

const glossary = require ('./routes/glossary');
app.use('/', glossary)

const logout = require ('./routes/auth/logout')
app.use ('/', logout)


module.exports = app;

app.listen(3000, ()=>{console.log('App is working on port 3000')})

