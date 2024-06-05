const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const one_time_reward = new Schema({
    range:{
        type:Number,

    },
    multiplier:{
        type:Number,
    }
})

const Badges = new Schema({
    points:{
        type:Number,
    },
    badges:{
        types:String,
    }
})


const reedem_reward = new Schema({
    product:{
        type:String,
    },
    reedem_points:{
        type:Number,
    }

})

module.exports = mongoose.model('one_time_reward',one_time_reward,'Badges',Badges,'reedem_reward ',reedem_reward );