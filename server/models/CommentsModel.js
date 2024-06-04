
//Comments (component_id , comments(Array [Name, comment ,date])

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    Name:{
        type: String,
    },
    comment :[{
        type: String,
    }],
    date:{
        type: Date,
        default: Date.now
    }
})
const Comments = new Schema({
    id:{
        type : mongoose.Schema.Types.ObjectId,
        ref:componentSchema,
        required: true
    },
    comments : [comment],
});

module.export = {Comments}