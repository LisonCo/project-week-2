const express = require('express');
const router  = express.Router();

router.get('/profileInfo', function (req, res) {
    res.render('auth/profileInfo')
    })

module.exports = router