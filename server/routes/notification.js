const express = require("express");
const router = express.Router();

const {getAllNotifications}= require("../controllers/notifyController")

router.get('/notifications',getAllNotifications);

module.exports = router;