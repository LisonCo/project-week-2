const express = require('express');
const router  = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const User = require("../models/Users");
const Comment = require("../models/Comment");

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
                shuffle(picturesInfo);
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

// Function to shuffle an array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Page that displays one specific picture
router.get('/discover/:id', function (req, res) {
    const imageID = req.params.id;
    
    axios.get(`http://hubblesite.org/api/v3/image/${imageID}`)
    .then((picture) => {
        console.log(picture)
        Comment.find({imageID})
        .then(comments=>{
            console.log(comments)
            res.render('image', {picture: picture, id: imageID, comments: comments})
        })  
    })
    .catch((err) => {
        console.log(err)
     })
})

// Route to save a picture as favorite/remove a picture
router.post('/discover/favorite/:id', (req, res) => {
    let imageID = req.params.id;
    let userID = req.session.user._id;
    User.findById(req.session.user._id)
        .then((user) => {
        let {favorites} = user;
        if(favorites.includes(imageID)){
            User.updateOne({"_id": userID}, {"$pull": {"favorites": imageID}})
                .then((reponse) => {
                res.send({favorite: false})
                })
                .catch((err) => {
                console.log(err)
                })
        } else {
            User.updateOne({"_id": userID}, {"$push": {"favorites": imageID}}, {new: true})
            .then((response) => {
                res.send({favorite: true})
            })
            .catch((err) => {
                console.log(err)
            })
            }
    })
})
    

// Route to post a comment
router.post('/addComment/:id', (req, res)=>{
    const imageID = req.params.id;
    const comment = req.body.comments

    Comment.create({comment, imageID})
    .then(()=>{
        console.log('Comment has been added')
        res.redirect(`/discover/${imageID}`)
    })
})

module.exports = router


