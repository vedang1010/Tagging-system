const express = require("express");
const router = express.Router();

const {uploadComponent,uploadIdea,uploadIssue} = require('../controllers/uploadController');

router.post('/uploadComponent' , uploadComponent);
router.post('/uploadIdea' , uploadIdea);
router.post('/uploadIssue' , uploadIssue);

module.exports = router;