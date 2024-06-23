const express = require("express");
const router = express.Router();
const{fetchUserInfo,insertDummyUser,updateUserContributions,updateUser}= require('../controllers/userController');
router.get('/fetchUserInfo/:id', fetchUserInfo);
router.get('/insertDummyUser',insertDummyUser)
router.put('/updateUserContributions',updateUserContributions)
router.post('/updateUser',updateUser)
module.exports = router;

