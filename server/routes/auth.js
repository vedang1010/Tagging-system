const express = require('express');
const router = express.Router()


const {loginUser} = require('../controllers/userController')
const { sendOtp, verifyOtp, setPassword  } = require('../controllers/authController');


// Login and signup route

router.post('/login',loginUser)
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/set-password', setPassword);
// router.post('/logout', logout);


// Signup Route
// router.post('/signup',signupUser)



module.exports = router;