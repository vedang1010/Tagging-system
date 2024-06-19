// upload idea and component
const upload = require('../models/UploadModel');

const uploadComponent = async (req, res) => {
    const { componentName, domain, selectedTags, languages, libraries, shortdescription, largedescription, usagedescription, file, screenshot, entityType } = req.body;

    const newEntity = new upload({
        componentName,
        domain,
        selectedTags,
        languages,
        libraries,
        description: {
            short: shortdescription,
            full: largedescription,
            usage: usagedescription
        },
        file,
        screenshot,
        entityType
    });
    try {
        await newEntity.save();
        res.status(201).json({ message: "Component uploaded successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { uploadComponent };
