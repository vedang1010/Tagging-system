//Review1 (component_id, func, remarks, contributor_email, status)
//Review2 (component_id, tech , legal, remarks, contributor_email, status)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewIdeaSchema = new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:componentSchema,
        required: true
    },
    funct_stars:{
        type: Number,
        
    },
    Remarks:{
        type: String,
    },
    email:{
        type: Array,
    },
    status :{
        type: String,
        required: true
    }

})


const reviewComponent= new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:componentSchema,
        required: true
    },
    tech_stars:{
        type: Number,
        
    },
    legal_start:{
        type: Number,
    },
    Remarks:{
        type: String,
    },
    email:{
        type: Array,
    },
    status :{
        type: String,
        required: true
    }
})

module.export={reviewIdeaSchema, reviewComponent}


