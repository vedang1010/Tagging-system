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
    },
    group:{
        type:String,            //Either group A or B
                                //A => reviewer , B => Consumer
        required: true,
    },
    subgroup:{
        type:Number,         // 1. fucntional_review
                             // 2. Technical_review
                             // 3. Legal_review
    }



})

module.export = mongoose.model('UserInfo',userInfo);