const express = require('express');
const router  = express.Router();
const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


// GET login page
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

// Fill login page
router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username})
    .then((user)=> {
      if(user) {
        bcrypt.compare(req.body.password, user.password, function(err, match){
          if(err) throw new Error 
          if(match) {
            req.session.user = user;
            res.redirect('/profile')
          } else {
            res.send("invalid credentials.")
          }
        });
      } else {
        res.send("invalid credentials.");
      }
    });
});

// ---------------------------------------------------

// GET signup page
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

// Fill signup page
router.post("/signup", (req, res, next) => {
  debugger
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (username === "" || password === "") {
      res.render("auth/signup", {
        errorMessage: "Indicate a username and a password to sign up"
      });
      return;
    }

  User.findOne({ "username": username })
    .then(user => {
      if (user !== null) {
          res.render("auth/signup", {
            errorMessage: "The username already exists!"
          });
          return;
        } else {
          User.create({
            username,
            password: hashPass
          })
          .then((newUser) => {
            res.redirect("/login");
          })
          .catch(error => {
            console.log(error);
          })
        }
 
    })
    .catch(error => {
      next(error);
    })
});

// ---------------------------------------------------

// Fill profile info


module.exports = router