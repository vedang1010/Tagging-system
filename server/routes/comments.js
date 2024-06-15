const express = require("express");
const router = express.Router();
const{insertDummyData,postComment,fetchComments,updateDislikes,updateLikes}= require('../controllers/commentsController');


router.get('/insertDummyData', insertDummyData);
router.get('/fetchComments/:id', fetchComments);
router.post('/postComment/:id', postComment);
router.get('/updateLikes/:componentId/like/:commentId', updateLikes);
router.get('/updateDislikes/:componentId/dislike/:commentId', updateDislikes);

module.exports=router

