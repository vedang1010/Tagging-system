const express = require("express");
const router = express.Router();

const {uploadComponent,uploadIdea} = require('../controllers/uploadController');

router.post('/uploadComponent' , uploadComponent);
router.post('/uploadIdea' , uploadIdea);

module.exports = router;