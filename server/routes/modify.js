const express = require("express");
const router = express.Router();
const{updateComponent,getModifiedComponent}= require('../controllers/modifyComponentController');

router.put('/updateComponent/:id', updateComponent);
router.get('/getModifiedComponent/:id', getModifiedComponent);

module.exports = router;