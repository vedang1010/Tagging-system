const express = require("express");
const router = express.Router();
const{updateComponent}= require('../controllers/modifyComponentController');

router.put('/updateComponent/:id', updateComponent);

module.exports = router;