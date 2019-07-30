const express = require('express');
const router  = express.Router();
const User = require("../../models/Users");


router.get('/profileInfo/:id', function (req, res) {
    debugger
    var person = req.params.id
        User.findById(person)
        .then((users)=> {
            debugger
            res.render('auth/profileInfo', {users})
        })
        .catch(err => console.log(err))
})

router.post('/profileInfo', (req, res)=>{
    var image = `images/${req.body.profilePicture}.jpg`
    const { name, birthday, email } = req.body;
    User.updateOne({_id: req.query.users_id}, { $set: { name, birthday, email, image }}, {new: true })
    .then((user) => {
        console.log(user)
        res.redirect(`/profile/${req.query.users_id}`)
    })
    .catch((error) => {
        console.log(error);
    })
});

module.exports = router