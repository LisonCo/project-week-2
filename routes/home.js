const express = require('express');
const router  = express.Router();

router.get('/', function (req, res) {
    res.render('home')
})

router.get('/menu', function (req, res) {
    res.render('menu')
})

module.exports = router