const { Component, Tag } = require('../models/ComponentModel');


const viewComponentStoreDashboard = async (req, res) => {

    try {

    } catch (err) {

    }
}


const SearchComponents = async (req, res) => {
    try {
        const { query, tags, dept } = req.body;
        console.log(tags);
        console.log(typeof (tags));
        console.log(query)
        const components = await Component.find({ "$or": [{ "taglist": { "$in": tags } }, { "dept": { "$in": dept } }, { "name": { $regex: query, $options: 'i' } }] });
        console.log(components);
        res.status(200).json(components);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getAllTags = async (req, res) => {
    try {
        Tag.find().then(result => {
            console.log(result);
            const tags = []
            result.map(tag => {
                tags.push(tag.tag_name);
            })
            res.status(200).json(tags);
        })
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getMostLiked = async (req, res) => {
    try {
        const components = await Component.find().sort({ likes: -1 }).limit(6);
        res.status(200).json(components);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getMostFrequent = async (req, res) => {
    try {
        const components = await Component.find().sort({ frequency: -1 }).limit(6);
        res.status(200).json(components);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}




module.exports = { viewComponentStoreDashboard, SearchComponents, getAllTags,getMostLiked, getMostFrequent };


