const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {
        type: String,
        //required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'Anonymous',
    },
    date: {
        type: String,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
});

const commentsSchema = new Schema({
    componentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',  // Assuming you have a 'Component' schema
        required: true,
    },
    comments: [commentSchema],
});

module.exports = mongoose.model('Comments', commentsSchema);
