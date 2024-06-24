const express = require("express");
const router = express.Router();

const {uploadComponent,uploadIdea,sendToReviewIdea,sendToReviewComponent} = require('../controllers/uploadController');

router.post('/uploadComponent' , uploadComponent);
router.post('/uploadIdea' , uploadIdea);
router.post('/sendToReviewIdea' , sendToReviewIdea);
router.post('/sendToReviewComponent' , sendToReviewComponent);

module.exports = router;