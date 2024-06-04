const express = require("express");
const router = express.Router();
const{getAllIdeas, fetchIdea, fetchComponent}= require('../controllers/reviewController');


router.post('/getAllIdeas',getAllIdeas);
router.post('/fetchComponent',fetchComponent);
router.post('/fetchIdea',fetchIdea);


module.exports = router;



