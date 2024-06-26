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
    },
    link: {
        type: String,
        default:"",
    
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
      default: "", // Default value for name
    },
    idea: {
      type: String,
      default: "", // Default value for idea
    },
    taglist: [{
      type: String,
      default: "", // Default value for each tag
    }],
    contributors: [contributorSchema], // Assuming contributorSchema has its own defaults
    type: {
      type: String,
      default: "", // Default value for type
    },
    frequency: {
      type: Number,
      default: 0, // Default value for frequency
    },
    stars: {
      type: Number,
      default: 0, // Default value for stars
    },
    likes: {
      type: Number,
      default: 0, // Default value for likes
    },
    description: {
      short: {
        type: String,
        default: "", // Default value for short description
      },
      full: {
        type: String,
        default: "", // Default value for full description
      }
    },
    sys_requirements: {
      type: String,
      default: "", // Default value for system requirements
    },
    license: {
      type: String,
      default: "Siemens", // Default value for license
    },
    haveIssues: {
      type: Boolean,
      default: false, // Default value for haveIssues
    },
    status1: {
      type: String,
      default: "Pending", // Default value for status1
    },
    status2: {
      type: String,
      default: "Pending", // Default value for status2
    },
    preview: [{
      type: String,
      default: "", // Default value for each preview URL
    }],
    file: [{
      type: String,
      default: "", // Default value for each file URL
    }],
    __v: {
      type: Number,
      default: 0, // Default value for __v
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
const Contributor=mongoose.model('Contributor',contributorSchema)
module.exports = {
    Component,
    Tag,
    Contributor,
};
