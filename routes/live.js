const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/live', function (req, res) {
    axios.get('http://hubblesite.org/api/v3/external_feed/st_live')
    .then((response) => {
        res.render('live', {live : response.data[0]})
    })
})

module.exports = router