// I need to add express since I want to add more routes here.
const express = require('express');
const router = express.Router();

// get: browser is asking for data.
// post: save information.

// When user comes to "test", I'm going to request~ ~~ key will be msg.
router.get('/test', (req, res) => res.json({
 msg: 'Profile works!'
}));

// I need to export evertying in my routers.
module.exports = router;
