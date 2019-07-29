
const express = require('express');
const app = express();
const hbs = require("hbs");
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use (express.static('public'))


const home = require('./routes/home');
app.use('/', home);

const discover = require ('./routes/images');
app.use('/', discover);

const login = require('./routes/login');
app.use('/', login);

const signup = require('./routes/signup');
app.use('/', signup);

const image = require ('./routes/images');
app.use('/', image);

const live = require ('./routes/live');
app.use('/', live)

module.exports = app;

app.listen(3000)

