const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification = new Schema({
    
   
})

const notifications = new SchemaTypes({
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
    }
})

module.export = mongoose.model('Notification',notifications);