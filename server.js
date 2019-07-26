// “require” is the same as import in Angular.
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
// Bring in my body parser.
// If we bring it here (server.js), we don’t need to do every JS files.
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Create an instance of the express() to tell my route to go to.
// So you bring in everything from express().
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// We need to bring in key.js with the specific obj <mongoURI>.
// Db config
const db = require('./config/keys').mongoURI;

// How to test it?
// I’m going to call my mongoose library to connect variable <db>.
// Promise statement: .then().catch()
// .then(): promise (When it succeeds~)
// .catch(): In case, it fails, check what my error looks like.
mongoose.connect(db)
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

// Passport middleware 
app.use(passport.initialize());

// Passport config (configuration)
require('./config/passport')(passport);


// Create the first route.
// Go to <app (= express)>, add the route called <get> and say..
// “If the user comes to the main page(‘/’), I gotta request(req) in, and respond(res) back saying(res.send) "Hello".
// When I get to this route ('/'), I go into this function. 
app.get('/', (req, res) => res.send('Hello world'));


// Add few more routes. (Call my users, profile, posts.)
// Need to tell server.js that I created new js files.
// If you come to “/api/users”, I want you to call me “users” which means I’m routing my express to go fire JS.
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// How do I tell my <express> where (what port) to begin? 
// Create port.
const port = process.env.PORT || 5004;
// I’m going to tell my express to listen on the port (listen(port)) and
// when you succeed (for listening), print out the following:
app.listen(port, () => console.log(`Server is running on port ${port}`))