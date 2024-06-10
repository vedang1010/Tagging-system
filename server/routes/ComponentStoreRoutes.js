const express = require("express");
const router = express.Router();

const {viewComponentStoreDashboard ,SearchComponents} = require('../controllers/componentStoreController');

router.post('/viewComponentStoreDashboard' , viewComponentStoreDashboard);
router.get('/SearchComponents' , SearchComponents);

module.exports = router;