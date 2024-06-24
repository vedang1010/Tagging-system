// upload idea and component
const {Component,Contributor} = require('../models/ComponentModel');
const {Issue} = require('../models/IssueModel');
const {ReviewIdea,ReviewComponent}=require('../models/ReviewIdeaModel')
const uploadComponent = async (req, res) => {
    const { componentName,  domain, selectedTags, shortdescription, largedescription, sysRequirements, file, screenshot } = req.body;

    const newEntity = new Component({
        name:componentName,
        type:domain,
        taglist:selectedTags,
        description: {
            short: shortdescription,
            full: largedescription,
        },
        sys_requirements: sysRequirements,
        file:file,
        preview: screenshot,
        
    });
    try {
        await newEntity.save();
        res.status(201).json({ message: "Component uploaded successfully!" });
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const sendToReviewIdea = async (req, res) => {
    const {contributorId,componentId} = req.body; // Accessing the parameter from req.params
    console.log("user id",contributorId)
    console.log(componentId)
    try {
        const newReview=new ReviewIdea({
            id:componentId,
            contributor_id:contributorId,
        })
        
        console.log("newReview",newReview)
        // Check if the component was found and updated
        await newReview.save();

        // return updatedComponent
        // Return the updated component
        res.status(200).json(newReview);
    } catch (error) {
        // Handle any errors that occurred during the update
        res.status(500).json({ message: 'Error updating user contributions', error });
    }
};
const sendToReviewComponent= async (req, res) => {
    const {contributorId,id,modifyId} = req.body; // Accessing the parameter from req.params
    console.log("user id",contributorId)
    console.log(id)
    try {
        const newReview=new ReviewComponent({
            id:id,
            modifyId:modifyId,
            contributor_id:contributorId,
        })
        
        console.log("newReview",newReview)
        // Check if the component was found and updated
        await newReview.save();

        // return updatedComponent
        // Return the updated component
        res.status(200).json(newReview);
    } catch (error) {
        // Handle any errors that occurred during the update
        res.status(500).json({ message: 'Error updating user contributions', error });
    }
};

const uploadIdea = async (req, res) => {
    const { ideaName, domain, shortdescription, sysRequirements, contributorId } = req.body;

    try {
        // Create a new contributor object
        const newContributor = new Contributor({
            id: contributorId,
            version: 1,
            date: new Date(),
            link: "",
        });

        // Save the new contributor
        await newContributor.save();

        // Create a new component entity
        const newEntity = new Component({
            name: ideaName,
            idea: ideaName, // Assuming 'idea' field represents the same as 'name'
            type: domain,
            description: {
                short: shortdescription,
            },
            sys_requirements: sysRequirements,
            contributors: [newContributor], // Assign the newly created contributor
        });

        // Save the new component entity
        await newEntity.save();

        res.status(201).json({ message: "Component uploaded successfully!", newEntity });
        // return newEntity
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
const uploadIssue = async (req, res) => {
    const {name,description,status} = req.body;

    const newEntity = new Issue({
        name:name,
        description:description,
        status:status,
    });
    try {
        await newEntity.save();
        res.status(201).json({ message: "Issue uploaded successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { uploadComponent,uploadIdea,uploadIssue,sendToReviewIdea ,sendToReviewComponent};
