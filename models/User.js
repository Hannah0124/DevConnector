const mongoose = require('mongoose');
// Build a schema (definition of data) for my user module.
const Schema = mongoose.Schema;

// Create an instance of the schema.
// {} => JSON obj
const UserSchema = new Schema({
  name: {
    type: String, // define name type.
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now // Date.now: Current date time.
  }
});

// I'm going to export User.
// model means 'table' named 'users', 
// and use schema named 'UserSchema'.
module.exports = User = mongoose.model('users', UserSchema)