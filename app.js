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

module.exports = app;

app.listen(3000)