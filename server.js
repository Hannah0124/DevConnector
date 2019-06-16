// “require” is the same as import in Angular.
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Create an instance of the express() to tell my rout to go to.
const app = express();

// We need to bring in key.js
// Db config
// Need to require other JS file.
// not keys.js, just the name of the file.
const db = require('./config/keys').mongoURI

// test?
// I'm gonnna tell my mongoose to connect db
// .catch: In case, it failes~
mongoose.connect(db).then(() => console.log('MongoDb connected')).catch(err => console.log(err));

// Create the first rout.
// Go to <app (= express)>, add the rout called <get> and say..
// “If the user comes to the main page(‘/’), I gotta request(req) in, and respond(res) back saying(res.send) "Hello".
app.get('/', (req, res) => res.send('Hello world'));


// How to add routes.
// Call my users, profile, posts.
// "Get" is the final destination, we need to use "use" instead.
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// How do I tell my <express> where (what port) to begin? 
// Create port.
const port = 5004;
// I’m going to tell my express to listen on the port (listen(port)) and
// when you succeed (for listening), print out the following:
app.listen(port, () => console.log(`Server is running on port ${port}`))