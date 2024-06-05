const express = require("express");
const router = express.Router();
const{getAllIdeas, fetchIdea, fetchComponent}= require('../controllers/reviewController');

console.log("Welcome1");
router.get('/getAllIdeas',getAllIdeas);
router.post('/fetchComponent',fetchComponent);
router.post('/fetchIdea',fetchIdea);

module.exports = router;



