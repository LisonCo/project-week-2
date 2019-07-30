const express = require('express');
const router  = express.Router();
const User = require("../models/Users");


router.get('/profile/:id', function (req, res) {
    User.findById(req.params.id)
    .then((user)=>{
        res.render('profile', {user})
    })
})



module.exports = router