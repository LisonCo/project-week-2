const express = require('express');
const router  = express.Router();
const axios = require('axios');

router.get('/glossary', function (req, res) {
    axios.get('http://hubblesite.org/api/v3/glossary?page=all')
    .then((response)=> {
        res.render('glossary', {glossary : response})
    })
    .catch((error)=> {
        console.log(error)
    })
})

module.exports = router