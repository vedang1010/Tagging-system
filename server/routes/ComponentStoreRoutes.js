const express = require("express");
const router = express.Router();

const {viewComponentStoreDashboard ,SearchComponents,getAllTags,getMostLiked,getMostFrequent} = require('../controllers/componentStoreController');

router.post('/viewComponentStoreDashboard' , viewComponentStoreDashboard);
router.post('/SearchComponents' , SearchComponents);
router.get('/getAllTags' , getAllTags);
router.get('/getMostLiked' , getMostLiked);
router.get('/getMostFrequent' , getMostFrequent);

module.exports = router;