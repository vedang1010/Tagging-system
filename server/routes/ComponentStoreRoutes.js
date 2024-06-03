const express = require("express");
const router = express.Router();

const {viewComponentStoreDashboard} = require('../controllers/componentStoreController');

router('/viewComponentStoreDashboard' , viewComponentStoreDashboard);