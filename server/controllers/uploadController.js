// upload idea and component
const {Component} = require('../models/ComponentModel');
const {Issue} = require('../models/IssueModel');

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

const uploadIdea = async (req, res) => {
    const { ideaName,  domain, shortdescription, sysRequirements } = req.body;

    const newEntity = new Component({
        name:ideaName,
        type:domain,
        description: {
            short: shortdescription,
        },
        sys_requirements: sysRequirements,
        
    });
    try {
        await newEntity.save();
        res.status(201).json({ message: "Component uploaded successfully!" });
    } catch (error) {
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

module.exports = { uploadComponent,uploadIdea,uploadIssue };
