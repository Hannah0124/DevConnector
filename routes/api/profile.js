// I need to add express since I want to add more routes here.
const express = require('express');
const router = express.Router();


// When a user comes to "/test (sub route)", I'm going to get the request, and send the response back in the JSON format. A key will be a msg, a value will be “User works!”. So, this is going to send back to the client.
router.get('/test', (req, res) => res.json({
 msg: 'Profile works!'
}));

// I need to export evertying from my routers.
module.exports = router;
