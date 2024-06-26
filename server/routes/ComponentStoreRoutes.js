const express = require("express");
const router = express.Router();

const {viewComponentStoreDashboard ,SearchComponents,getAllTags} = require('../controllers/componentStoreController');

router.post('/viewComponentStoreDashboard' , viewComponentStoreDashboard);
router.post('/SearchComponents' , SearchComponents);
router.get('/getAllTags' , getAllTags);

module.exports = router;