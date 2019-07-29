
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
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




const home = require('./routes/home');
app.use('/', home);

const discover = require ('./routes/images');
app.use('/', discover);

const loginSignup = require('./routes/auth/users');
app.use('/', loginSignup);

const profileInfo = require('./routes/profileInfo')
app.use('/', profileInfo)



const image = require ('./routes/images');
app.use('/', image);

const live = require ('./routes/live');
app.use('/', live)

module.exports = app;

app.listen(3000, ()=>{console.log('App is working on port 3000')})

