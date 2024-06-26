//Issue (issue_id, component_id, description, reporter_id, date, resolver_id, status)
const {Issue} = require('../models/IssueModel');
const { Component } = require('../models/ComponentModel');

const raiseIssue = (req, res) => {
    const { component_id, description, reporter_id } = req.body;


    // find if component already exists
    Issue.findOne({ component_id: component_id, status: 'pending' }).exec()
        .then(issue => {
            if (issue) {
                res.status(400).json({ message: "Issue already exists" });
            } else {
                const newIssue = new Issue({
                    component_id,
                    description,
                    reporter_id,
                });
                try {
                    newIssue.save();
                    Component.findByIdAndUpdate(component_id, { haveIssues: true }).exec()
                        .then((result) => {
                            console.log(result);
                            res.status(201).send({ message: "Issue raised successfully" });
                        })
                } catch (err) {
                    res.status(400).send({ message: "Error raising issue" });
                }
            }
        }
        )

};

const searchIssues = async (req, res) => {
    try {
        const searchName = req.query.name;
        const components = await Component.find({ name: new RegExp(searchName, 'i'), haveIssues:true });

        const componentIds = components.map(component => component._id);

        const issues = await Issue.find({ component_id: { $in: componentIds }, status:'pending' })
            .populate('component_id', 'name') // Populate component_id with its name field
            .exec();
        console.log(issues);
        const results = issues.map(issue => ({
            issue_id: issue._id,
            description: issue.description,
            component_name: issue.component_id.name,
            component_id: issue.component_id._id
        }));

        res.status(200).json(results);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}


const getAllIssues = (req, res) => {
    Issue.find({ status: 'pending' }).populate('component_id','name')
        .exec()
        .then(issues => {
            const results = issues.map(issue => ({
                issue_id: issue._id,
                description: issue.description,
                component_name: issue.component_id.name,
                component_id: issue.component_id._id
            }));

            res.status(200).json(results);
        })
        .catch(err => {
            res.status(404).json({ message: err.message });
        })
}




module.exports = { raiseIssue, searchIssues, getAllIssues };
