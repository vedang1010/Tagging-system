// upload both idea and component files

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Contributor schema
const contributorSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    version: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const uploadSchema = new Schema({
    component: {
        type: String,
    },
    idea: {
        type: String,
    },
    domain: {
        type: String,
    },
    selectedTags: [{
        type: String,
    }],
    languages: {
        type: String,
    },
    libraries: {
        type: String,
    },
    contributors: [contributorSchema],
    type: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
    },
    stars: {
        type: Number,
    },
    likes: {
        type: Number,
    },
    description: {
        short: {
            type: String,
        },
        full: {
            type: String,
        },
        usage: {
            type: String,
        }
    },
    file: [{
        type: String,
    }],
    screenshot: [{
        type: String,
    }],
    entityType: {
        type: String,
        enum: ['component', 'idea'],
        // required: true
    },
    __v: {
        type: Number,
    }
});

module.exports = mongoose.model('upload', uploadSchema);
