//email, name , designation, points, department
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfo = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    designation:{
        type: String,
        required: true,
    },
    points:{
        type: Number,
        defaultValue: 0,
    },
    dept:{
        type: String,
        required: true,
    }

})

module.export = mongoose.model('UserInfo',userInfo);