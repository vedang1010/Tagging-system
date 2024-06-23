// upload idea and component
const {Component,Contributor} = require('../models/ComponentModel');

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
module.exports = { uploadComponent,uploadIdea };
