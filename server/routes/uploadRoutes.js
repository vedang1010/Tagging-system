const express = require("express");
const router = express.Router();

const {uploadComponent,uploadIdea,uploadIssue,sendToReviewIdea,sendToReviewComponent} = require('../controllers/uploadController');

router.post('/uploadComponent' , uploadComponent);
router.post('/uploadIdea' , uploadIdea);
router.post('/sendToReviewIdea' , sendToReviewIdea);
router.post('/sendToReviewComponent' , sendToReviewComponent);
router.post('/uploadIssue' , uploadIssue);

module.exports = router;