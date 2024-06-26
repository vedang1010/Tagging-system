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


const reviewComponentSchema= new Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Component',
        required: true   
     },
    modifyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ModifiedComponent',
        //required:true
    },
    tech_stars:{
        type: Number,
        default:0,
    },
    legal_stars:{
        type: Number,
        default:0,
    },
    Remarks_tech:{
        type: String,
    },
    Remarks_legal:{
        type: String,
    },
    contributor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    status1 :{
        type: String,
        required: true,
        default: "Accepted"
    },
    // status2 :{
    //     type: String,
    //     required: true,
    //     default: "Pending"
    // }
    status_tech :{
        type: String,
        required: true,
        default: "Pending"
    },
    status_legal :{
        type: String,
        required: true,
        default: "Pending"
    },
});

// module.export=mongoose.model('ReviewIdea',reviewIdeaSchema,'ReviewComponent', reviewComponent)
const ReviewIdea = mongoose.model('ReviewIdea', reviewIdeaSchema);
const ReviewComponent = mongoose.model('ReviewComponent', reviewComponentSchema);

module.exports = { ReviewIdea, ReviewComponent };



