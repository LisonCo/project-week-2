const express = require('express');
const router  = express.Router();
const User = require("../models/Users");
const axios = require('axios');

router.get('/profile/:id', function (req, res) {
    User.findById(req.params.id)
    .then(oneUser => {
        const favorites = oneUser.favorites
        var getPromises = [];
        for (i=0; i< favorites.length; i++){
            getPromises.push(axios.get(`http://hubblesite.org/api/v3/image/${favorites[i]}`).then(response => response.data))
        }

        Promise.all(getPromises)
        .then ((response) =>{
            res.render('profile', {favorites : response, user: oneUser});
        })
        .catch((error)=> {
            console.log(error)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router