const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    // period: {
    //     type: String,
    //     required: true,
    // },
    duration: {
        type: String,
        required: true,
    }
}, { _id : false });

const userInfoSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        //required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0, 
    },
    dept: {
        type: String,
        required: true,
    },
    group: {
        type: String, // Either group A or B
        required: true, // A => reviewer, B => Consumer
    },
    subgroup: {
        type: String, // 1. functional_review, 2. Technical_review, 3. Legal_review
    },
    linkedinProfile: {
        type: String,
    },
    yearsOfExperience: {
        type: Number,
    },
    skills: {
        type: [String],
    },
    location: {
        type: String,
    },
    ideasAccepted: {
        type: Number,
        default: 0,
    },
    ideasProposed: {
        type: Number,
        default: 0,
    },
    componentsAccepted: {
        type: Number,
        default: 0,
    },
    componentsProposed: {
        type: Number,
        default: 0,
    },
    experience: {
        type: [experienceSchema],
    },
    contributions: {
        type: [Schema.Types.ObjectId],
        ref: 'Contribution',
    }
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);
const ExperienceSchema= mongoose.model('ExperienceSchema', experienceSchema);
module.exports = { UserInfo,ExperienceSchema };
