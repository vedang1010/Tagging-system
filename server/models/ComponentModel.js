// Component (Component_id ,idea , tagList( Array ), Contributors (Array [ Email, date, version, link]) , type, frequency, stars, likes, description ,status1 , status2)
// Tags (tag_name, components( Array [component_id , Access(Array)]))

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const componentSchema = new Schema({
    idea: {
        type: String,
        required: true
    },
    taglist: {
        type: Array
    },
    contributors: {
        type: Array,
    },
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
    status1: {
        type: Boolean
    },
    status2: {
        type: Boolean
    },
})


const tagsSchema = new Schema({
    tag_name: {
        type: String,
        required: true
    },
    components: {
        type: Array,
        ref: 'Component'
    }
})

module.export = {componentSchema, tagsSchema}