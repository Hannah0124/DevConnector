const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Bring in mongoose library
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys')

// Build obj
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// Make sure to use jwtStrategy before exports?
module.exports = passport => {
  passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
  }));
}
