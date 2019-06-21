// I need to add express since I want to add more routes here.
const express = require('express');
// Within the express library, I only want to use “Router() function”
const router = express.Router();

// Bring my User 
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// =========

// Router will always have (req, res) as your parameter.
// We will send “json” response back. & Msg always needs to be “obj” format.
// When a user comes to "/test (sub route)", I'm going to get the request, and send the response back in the JSON format. A key will be a msg, a value will be “User works!”. So, this is going to send back to the client.
// dummy data
// router.get('/test', (req, res) => res.json({
//  msg: 'User works!'
// }));
// =========

// @route POST api/users/register 
// @desc Register user
// @access Public
// Start writing my API.
router.post('/register', (req, res) => {
  // When I check email, I will check if there is an email already or not.
  // email should match with the property name.
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(400).json({ // 400 bad request??
        email: 'Email already exists'
      })
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
  const email = req.body.email;
  const password = req.body.password; 

  // Find user by email.
  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({
          email: 'User not found'
        });
      }
    })
    .catch(err => console.log(err));
})


// I want to export everything from my routers because this is the only thing in this file.
module.exports = router;
