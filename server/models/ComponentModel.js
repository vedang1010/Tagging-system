// Component (Component_id ,idea , tagList( Array ), Contributors (Array [ Email, date, version, link]) , type, frequency, stars, likes, description ,status1 , status2)
// Tags (tag_name, components( Array [component_id , Access(Array)]))

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contributor= new Schema({
    id:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo',
        required: true
    }],
    date:{
        type: Date,
        default: Date.now
    },
    version:{
        type:Number,
    },
    link:{
        type : String,
    }
})

const tagsComponent = new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Component',
        required: true
    },
    access:[{
        type: String,
    }]
})

const componentSchema = new Schema({
    name:{
        type: String,
        required: true,
        
    },
    idea: {
        type: String,
        required: true
    },
    taglist: [{
      type: String,  
    }],
    contributors:[contributor],
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
        type: String,
        required: true
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
    preview:[{
        type: String,
        
    }]
})


const tagsSchema = new Schema({
    tag_name: {
        type: String,
        required: true
    },
    tagsComponents: [tagsComponent]
})

const Component = mongoose.model('Component', componentSchema);
const Tag = mongoose.model('Tag', tagsSchema);

module.exports = {
    Component,
    Tag
};
