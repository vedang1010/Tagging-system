const express = require("express");
const router = express.Router();
const{postData, fetchIdea, fetchComponent,insertComponent,insertDummyData}= require('../controllers/componentCardController');

router.post('/insertComponent',insertComponent);
router.get('/postData',postData);
router.get('/fetchComponent/:id',fetchComponent);
router.post('/fetchIdea',fetchIdea);
router.get('/insertDummyData', insertDummyData);

module.exports = router;



