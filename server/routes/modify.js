const express = require("express");
const router = express.Router();
const{updateComponent,getModifiedComponent,updateComponentInDatabase}= require('../controllers/modifyComponentController');

router.post('/updateComponent/:id', updateComponent);

router.post('/updateComponentInDatabase/:id', updateComponentInDatabase);
router.get('/getModifiedComponent/:id', getModifiedComponent);

module.exports = router;