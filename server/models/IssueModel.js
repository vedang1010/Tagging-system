//Issue (issue_id, component_id, description, reporter_id, date, resolver_id, status)

const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const issueModel = new Schema({
    component_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Component',
        required: true
    },
    reporter_email:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    resolver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    status:{
        type: String,
        required: true,
        default: "pending"
    }

})

// module.exports = mongoose.model('Issue',issueModel);
const Issue = mongoose.model('Issue', issueModel);
module.exports = {
    Issue,
};