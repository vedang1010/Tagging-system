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
    
});

// Define the TagsComponent schema
const tagsComponentSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
        required: true
    },
    access: [{
        type: String,
    }]
});

// Define the Component schema
const componentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    idea: {
        type: String,
        required: true
    },
    taglist: [{
        type: String,
    }],
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
            required: true
        },
        full: {
            type: String,
            required: true
        }
    },
    sys_requirements: {
        type: String,
        required: true
    },
    dependencies: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    status1: {
        type: String,
        required: true,
        default: "Pending"
    },
    status2: {
        type: String,
        required: true,
        default: "Pending"
    },
    preview: [{
        type: String,
    }],
    __v: {
        type: Number,
    }
});

// Define the Tag schema
const tagSchema = new Schema({
    tag_name: {
        type: String,
        required: true
    },
    components: [tagsComponentSchema]
});

// Create models
const Component = mongoose.model('Component', componentSchema);
const Tag = mongoose.model('Tag', tagSchema);

module.exports = {
    Component,
    Tag
};
