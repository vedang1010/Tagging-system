//Review1 (component_id, func, remarks, contributor_email, status)
//Review2 (component_id, tech , legal, remarks, contributor_email, status)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewIdeaSchema = new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Component',
        required: true
    },
    funct_stars:{
        type: Number,
        
    },
    Remarks:{
        type: String,
    },
    contributor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    status :{
        type: String,
        required: true,
        default: "Pending"
    }

})


const reviewComponent= new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Component',
        required: true
    },
    tech_stars:{
        type: Number,
        
    },
    legal_stars:{
        type: Number,
    },
    Remarks:{
        type: String,
    },
    contributor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    status :{
        type: String,
        required: true,
        default: "Pending"
    }
})

module.export=mongoose.model('ReviewIdea',reviewIdeaSchema,'ReviewComponent', reviewComponent)



