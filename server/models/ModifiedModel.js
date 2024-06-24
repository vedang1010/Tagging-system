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
        // required: true
    },
    link: {
        type: String,
        default:"",
    
    },
    
});


// Define the Component schema
const modifiedComponentSchema = new Schema({
    componentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Component',
        required:true
    },
    name: {
        type: String,
        // required: true
    },

    taglist: [{
        type: String,
    }],
    contributors: contributorSchema,
    type: {
        type: String,
        // required: true
    },
 
    description: {
        short: {
            
            type: String,
            default:"",
            // required: true
        },
        full: {
            type: String,
            default:"",
            // required: true
        }
    },
    sys_requirements: {
        type: String,
        // required: true
    },

    haveIssues: {
        type: Boolean,
        // required: true,
        default: "false",
    },


    preview: [{
        type: String,
    }],
    file: [{
        type: String,
    }]
});



// Create models
const ModifiedComponent = mongoose.model('ModifiedComponent', modifiedComponentSchema);
const ModifiedContributor=mongoose.model('ModifiedContributor',contributorSchema)
module.exports = {
    ModifiedComponent,
    ModifiedContributor
};
