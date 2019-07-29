const express = require('express');
const router  = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

// Page that displays all the pictures
router.get('/discover', function (req, res) {
    axios.get('http://hubblesite.org/api/v3/images/hubble_favorites_gallery?page=all')
    .then((response) => {
        var picturesIds = [];
        for (i=0 ; i < response.data.length ; i++){
            picturesIds.push(response.data[i].id)
        }
        var getPromises = [];
        for (i=0 ; i < picturesIds.length ; i++){
            getPromises.push(axios.get(`http://hubblesite.org/api/v3/image/${picturesIds[i]}`))
        }

        Promise.all(getPromises)
            .then((picturesInfo)=> {
                for(let index in picturesInfo) {
                    picturesInfo[index].id = picturesIds[index];
                }
                res.render('discover', {pictures : picturesInfo});
            })
            .catch((error)=> {
                console.log(error)
            })
    })
    .catch((err) => {
        console.log(err)
     })
})

// Page that displays one specific picture
router.get('/discover/:id', function (req, res) {
    const imageID = req.params.id;
    axios.get(`http://hubblesite.org/api/v3/image/${imageID}`)
    .then((pictures) => {
        res.render('image', {pictures})
    })
    .catch((err) => {
        console.log(err)
     })
})

module.exports = router