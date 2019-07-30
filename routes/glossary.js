const express = require('express');
const router  = express.Router();

router.get('/glossary', function (req, res) {
    res.render('glossary')
})

module.exports = router