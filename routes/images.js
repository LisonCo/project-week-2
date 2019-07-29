const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/discover', function (req, res) {
    axios.get('http://hubblesite.org/api/v3/images/all')
    .then((response) => {
        var picturesIds = [];
        for (i=0 ; i < response.data.length ; i++){
            picturesIds.push(response.data[i].id)
        }
        var picturesInfo = [];
        for (i=0 ; i < picturesIds.length ; i++){
            axios.get(`http://hubblesite.org/api/v3/image/${picturesIds[i]}`)
            .then ((response2) => {
                picturesInfo.push(response2.data)
                console.log(response2.data)
        })
        res.render('discover', {pictures : picturesInfo})
    }})
    .catch((err) => {
        console.log(err)
     })
})

module.exports = router