// I need to add express since I want to add more routes here.
const express = require('express');
// Within the express library, I only want to use “Router() function”
const router = express.Router();

// Bring my User 
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// =========

// Router will always have (req, res) as your parameter.
// We will send “json” response back. & Msg always needs to be “obj” format.
// When a user comes to "/test (sub route)", I'm going to get the request, and send the response back in the JSON format. A key will be a msg, a value will be “User works!”. So, this is going to send back to the client.
// dummy data
// router.get('/test', (req, res) => res.json({
//  msg: 'User works!'
// }));
// =========

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateloginInput = require('../../validation/login');

// @route POST api/users/register 
// @desc Register user
// @access Public
// Start writing my API.
router.post('/register', (req, res) => {
  const {errors, isValid} =  validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }


  // When I check email, I will check if there is an email already or not.
  // email should match with the property name.
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default
      });
      // create an instance of the User.
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar, // same as avatar: avatar, it's called "deconstruction"
        password: req.body.password
      });
      
      // generate salt (key)
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        // write function in function
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // In case I failed 'hashing', throw an error.
          if (err) throw err;
          // password needs to be overwritten with hash value now.
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  })
  .catch(err => console.log(err));
})

// @route POST api/users/login
// @desc Login user
// @access Public
// Start writing my API.
router.post('/login', (req,res) => {
  const {errors, isValid} =  validateloginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email;
  const password = req.body.password; 

  // Find user by email.
  // (Check database if the user exists.)
  User.findOne({email})
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // Check password (by using bcrypt library).
      // password = plain pw <--> user.password = hased pw 
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User matched 
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };

            // Ask Jwt to sign a token  (we need to sign in with payload.)
            // When do I want this token to be expired?
            jwt.sign(
                payload, 
                keys.secretOrKey,
                {expiresIn: 3600},
                // Error will tell you if it failes.
                // If I get the token, it will say "Bearer ~"
                (err, token) => {
                  // print out what the token looks like.
                  return res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        })
    })
    .catch(err => console.log(err));
})


// @route   GET api/users/current
// @desc    Return current user
// @access  private
// Start writing my API.
// I'm expecting a token at this point. (passport)
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json(req.user);
})

// I want to export everything from my routers because this is the only thing in this file.
module.exports = router;
