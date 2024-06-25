const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationschema = new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    desc:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    email :[{
        type: String,
        required : false
    }]
})

const Notifications = mongoose.model('Notification',notificationschema);
module.exports = {Notifications}