const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification = new Schema({
    date:{
        type: Date,
        default: Date.now
    },
    desc:{
        type: String,
        required: true
    }
})

const notifications = new SchemaTypes({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    notification:[notification],
})

module.export = mongoose.model('Notification',notifications);