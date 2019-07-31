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
        console.log(pictures)
        Comment.find({imageID})
        .then(comments=>{
            console.log(comments)
            res.render('image', {pictures: pictures, id: imageID, comments: comments})
        })  
    })
    .catch((err) => {
        console.log(err)
     })
})

router.post('/addComment/:id', (req, res)=>{
    const imageID = req.params.id;
    const comment = req.body.comments

    Comment.create({comment, imageID})
    .then(()=>{
        console.log('Comment has been added')
        res.redirect(`/discover/${imageID}`)
    })
})
// // Route to save a picture as favorite
// router.post('/discover/favorite/:id', (req, res) => {
//     let imageID = req.params.id;
//     User.updateOne({_id: user._id}, {$set: {}})

//     .then(favoritePicture => {
        
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

module.exports = router

// router.post('/recipe/edit/:id', (req, res) => {
//     let { title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook } = req.body;
//     Recipe.updateOne({_id : req.params.id}, {$set: {title, level, ingredients, cuisine, dishType, image, duration, creator, created, cook : mongoose.Types.ObjectId(req.body.cook)}})
//       .then(recipe => {
//       res.redirect('/recipes'); 
//     })
//     .catch(err => {
//        console.log(err)
//     })
//   })
//   router.post('/profileInfo', (req, res)=>{
//     const { name, birthday, email } = req.body;
//     User.updateOne({_id: req.query.users_id}, { $set: { name, birthday, email, image }}, {new: true })
//     .then((user) => {
//         console.log(user)
//         res.redirect(`/profile/${req.query.users_id}`)
//     })
//     .catch((error) => {
//         console.log(error);
//     })
// });


