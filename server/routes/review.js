const express = require("express");
const router = express.Router();
const{getAllIdeas, fetchIdea, getAllComponents, updateStatus1, updateStatus2, fetchUserInfo,getReviewById}= require('../controllers/reviewController');

console.log("Welcome1");
router.get('/getAllIdeas',getAllIdeas);
router.get('/getAllComponents',getAllComponents);
router.get('/fetchIdea/:id', fetchIdea);
router.post('/status1',updateStatus1);
router.post('/status2',updateStatus2);
router.get('/fetchUserInfo/:user',fetchUserInfo);
router.get('/getReviewById/:id',getReviewById);
module.exports = router;



