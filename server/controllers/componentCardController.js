const { Component } = require('../models/ComponentModel');
const mongoose = require('mongoose')
const { UserInfo } = require('../models/userInfo');

// mongoose.connect('mongodb://localhost:27017/your_database_name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const fetchUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(" USeer id " + userId);
        const response = await UserInfo.findById(userId);
        console.log("response" + response)
        if (!response) {
            console.log("Nothing found");
            return res.status(500).json({ error: 'Internal Server Error' })
        }
        // console.log(response)
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

const fetchIdea = async (req, res) => {
    //const{Idea}=req.body;
    try {
        console.log("fetchIdea");
        return res.json({ msg: 'hello from fetcghIdeas' })
    } catch (error) {
        console.log(error);
    }
}
const fetchComponentByIds = async (req, res) => {
    const { ids } = req.body; // Assuming the array of IDs is sent in the request body

    if (!Array.isArray(ids)) {
        return res.status(400).json({ error: 'Invalid input. Expected an array of IDs.' });
    }

    try {
        const components = await Component.find({ _id: { $in: ids } });
        return res.status(200).json(components);
    } catch (error) {
        console.error('Error fetching components:', error);
        return res.status(500).json({ error: 'An error occurred while fetching components.' });
    }
}

const fetchComponent = async (req, res) => {
    try {
        console.log("fetchComponent");
        const component_id = req.params.id; // Accessing the parameter from req.params
        console.log(component_id);
        const compo = await Component.find({ _id: component_id });

        if (compo.length > 0) {
            console.log(compo);
        } else {
            console.log('nothing found');
        }
        return res.json(compo)
    } catch (error) {
        console.log(error);
    }
}

const postData = async (req, res) => {
    try {
        console.log("fetchIdea");
        return res.json({ msg: 'hello from getAllIdeas' })
    } catch (error) {
        console.log(error);
    }

}
const insertComponent = async (req, res) => {
    const {
        _id,
        name,
        idea,
        taglist,
        contributors,
        type,
        frequency,
        stars,
        likes,
        description,
        sys_requirements,
        dependencies,
        license,
        status1,
        status2,
        preview
    } = req.body;

    const newComponent = new Component({
        _id,
        name,
        idea,
        taglist,
        contributors,
        type,
        frequency,
        stars,
        likes,
        description,
        sys_requirements,
        dependencies,
        license,
        status1,
        status2,
        preview
    });

    try {
        const savedComponent = await newComponent.save();
        res.status(201).json(savedComponent);
    } catch (error) {
        res.status(500).json({ message: 'Error inserting component', error });
    }
};

const insertDummyData = async (req, res) => {
    const dummyComponent = {
        _id: new mongoose.Types.ObjectId(),
        name: "Component M",
        idea: "An innovative idea for component M",
        taglist: ["tag1", "tag2"],
        contributors: [
            {
                id: new mongoose.Types.ObjectId(),
                date: new Date("2023-06-05T08:00:00.000Z"),
                version: 1,
                link: "http://example.com/component-a/v1",
                _id: new mongoose.Types.ObjectId()
            },
            {
                id: new mongoose.Types.ObjectId(),
                date: new Date("2023-06-05T09:00:00.000Z"),
                version: 2,
                link: "http://example.com/component-a/v2",
                _id: new mongoose.Types.ObjectId()
            }
        ],
        type: "DTS",
        frequency: 5,
        stars: 4.9,
        likes: 100,
        description: {
            short: "<p>This is a short description of component A.</p>",
            full: "<p>This is a detailed description of component A. It goes into more depth about the features and capabilities of the component, including technical specifications and use cases.</p>"
        },
        sys_requirements: "<p>Requirement 1</p><p>Requirement 2</p><p>Requirement 3</p>",
        dependencies: "Dependencies for component A",
        license: "MIT",
        status1: "Pending",
        status2: "Pending",
        preview: ["http://example.com/preview1", "http://example.com/preview2"]
    };

    const newComponent = new Component(dummyComponent);

    try {
        const savedComponent = await newComponent.save();
        res.status(201).json(savedComponent);
    } catch (error) {
        res.status(500).json({ message: 'Error inserting dummy data', error });
    }
};

const updateFrequency = async (req, res) => {
    const component_id = req.params.id; // Accessing the parameter from req.params
    console.log(component_id)
    try {
        // Find the component by ID and increment its frequency by 1
        const updatedComponent = await Component.findByIdAndUpdate(
            component_id,
            { $inc: { frequency: 1 } }, // Increment the frequency field by 1
            { new: true } // Return the updated document
        );
        console.log(updatedComponent)
        // Check if the component was found and updated
        if (!updatedComponent) {
            return res.status(404).json({ message: 'Component not found' });
        }
        // return updatedComponent
        // Return the updated component
        res.status(200).json(updatedComponent);
    } catch (error) {
        // Handle any errors that occurred during the update
        res.status(500).json({ message: 'Error updating frequency', error });
    }
};
const updateUserContributions = async (req, res) => {
    const {contributorId,componentId} = req.body; // Accessing the parameter from req.params
    console.log("user id",contributorId)
    console.log(componentId)
    try {
        // Find the component by ID and increment its frequency by 1
        const updatedUser = await UserInfo.findByIdAndUpdate(
            contributorId,
            { $addToSet: { contributions: componentId } },
            { new: true } // Return the updated document
        );
        console.log(updatedUser)
        // Check if the component was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // return updatedComponent
        // Return the updated component
        res.status(200).json(updatedUser);
    } catch (error) {
        // Handle any errors that occurred during the update
        res.status(500).json({ message: 'Error updating user contributions', error });
    }
};


const insertDummyUser = async (req, res) => {
    try {
        const data = [
            {
                email: "john.doe@example.com",
                name: "John Doe",
                imageUrl: "https://www.punestartupfest.in/images/navbarAndFooter/PSF24%20White.webp",
                about: "This is my about",
                designation: "Software Engineer",
                points: 120,
                dept: "Engineering",
                group: "A",
                subgroup: 1,
                linkedinProfile: "https://www.linkedin.com/in/johndoe",
                yearsOfExperience: 5,
                skills: ["JavaScript", "React", "Node.js"],
                location: "New York, USA",
                ideasAccepted: 3,
                ideasProposed: 10,
                componentsAccepted: 5,
                componentsProposed: 8,
                experience: [
                    {
                        title: "Senior Developer",
                        company: "Tech Corp",
                        period: "Jan 2020 - Present",
                        duration: "2 years"
                    },
                    {
                        title: "Junior Developer",
                        company: "Code Inc.",
                        period: "Jan 2018 - Dec 2019",
                        duration: "2 years"
                    }
                ],
                contributions: [
                    '66680c7d12f6b594ddc5f0d9', '6668258265a68659390b87cc'
                ]
            },
            {
                email: "test@gmail.com",
                name: "Jane Smith",
                imageUrl: "https://www.punestartupfest.in/images/navbarAndFooter/PSF24%20White.webp",
                about: "This is my about",
                designation: "Product Manager",
                points: 200,
                dept: "Product",
                group: "B",
                subgroup: 2,
                linkedinProfile: "https://www.linkedin.com/in/janesmith",
                yearsOfExperience: 8,
                skills: ["Product Management", "Agile", "Scrum"],
                location: "San Francisco, USA",
                ideasAccepted: 5,
                ideasProposed: 15,
                componentsAccepted: 7,
                componentsProposed: 12,
                experience: [
                    {
                        title: "Product Manager",
                        company: "Innovate Ltd.",
                        period: "Mar 2017 - Present",
                        duration: "4 years"
                    },
                    {
                        title: "Project Manager",
                        company: "BuildIt Inc.",
                        period: "Jan 2013 - Feb 2017",
                        duration: "4 years"
                    }
                ],
                contributions: [
                    '6668258265a68659390b87cd',
                    '6668258265a68659390b87ce',
                    '666853df5a37c0dfb0acdc2d'
                ]
            }
        ];

        const result = await UserInfo.insertMany(data);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error inserting dummy data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { postData, fetchIdea, fetchComponent, insertComponent, insertDummyData, updateFrequency, fetchUserInfo, insertDummyUser, fetchComponentByIds,updateUserContributions }