// server/controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendMail = require('../utils/mailer');
const validator = require('validator');

const sendOtp = async (req, res) => {
    console.log("in send otp");
    const { email } = req.body;
    console.log(email);
    try {
        if (!validator.isEmail(email)) {
            throw Error('Invalid email');
        }
        const user = await User.findOne({ email });
        
        if (user && !user.otp) {
            return res.status(400).json({ message: 'Email already in use' });
        }


        const otp = crypto.randomBytes(3).toString('hex');
        const otpExpiration = Date.now() + 3600000; // OTP valid for 1 hour
        
        const update = await User.findOneAndUpdate({ email }, { otp, otpExpiration }, { upsert: true, new: true });
        if(!update){
            return res.status(500).json({ message: 'Email already in use' });
        }

        await sendMail(email, 'Your OTP Code', `Your OTP code is ${otp}`);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email,otp);

    try {
        const user = await User.findOne({ email, otp });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or email' });
        }

        if (user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        res.status(200).json({ message: 'OTP verified' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setPassword = async (req, res) => {
    const { email, otp, password } = req.body;

    try {
        const user = await User.findOne({ email, otp });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or email' });
        }

        if (user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        if (!validator.isStrongPassword(password)){
            throw Error('Password is not strong enough');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user.password = hash;
        user.otp = undefined;
        user.otpExpiration = undefined;

        await user.save();

        res.status(200).json({ message: 'Password set successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    sendOtp,
    verifyOtp,
    setPassword
};
