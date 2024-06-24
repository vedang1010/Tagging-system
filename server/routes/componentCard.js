const express = require("express");
const router = express.Router();
const{postData, fetchIdea, fetchComponent,insertComponent,insertDummyData,updateFrequency,fetchUserInfo,insertDummyUser,fetchComponentByIds,updateUserContributions}= require('../controllers/componentCardController');

router.post('/insertComponent',insertComponent);
router.get('/postData',postData);
router.get('/fetchComponent/:id',fetchComponent);
router.post('/fetchComponentByIds',fetchComponentByIds);
router.post('/fetchIdea',fetchIdea);
router.get('/insertDummyData', insertDummyData);
router.get('/updateFrequency/:id', updateFrequency);
router.get('/fetchUserInfo/:id', fetchUserInfo);
router.get('/insertDummyUser',insertDummyUser)
router.put('/updateUserContributions',updateUserContributions)
module.exports = router;



