const { Component, Tag } = require('../models/ComponentModel');


const viewComponentStoreDashboard = async (req, res) => {

    try {

    } catch (err) {

    }
}


const SearchComponents = async (req, res) => {
    try {
        console.log("in search");
        const searchQuery  = req.query.q;
        console.log(searchQuery)
        const components = await Component.find({ name: { $regex: searchQuery, $options: 'i' } });
        console.log(components);
        res.status(200).json(components);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}



module.exports = { viewComponentStoreDashboard ,SearchComponents};


