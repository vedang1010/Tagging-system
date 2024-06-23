const User = require('../models/user');
const jwt = require('jsonwebtoken');
const{UserInfo}=require("../models/userInfo")
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


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

const updateUser = async (req, res) => {
    const { id, user } = req.body; // Accessing the parameter from req.body
    try {
        // Find the user by ID and update with new user data
        console.log("user",user)
        const updatedUser = await UserInfo.findByIdAndUpdate(
            id,
            user,
            { new: true,overwrite:true } // Return the updated document
        );
        console.log("userid",id)

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the updated user document
        res.status(200).json(updatedUser);
    } catch (error) {
        // Handle any errors that occurred during the update
        console.error(error); // Proper logging for debugging
        res.status(500).json({ message: 'Error updating user', error });
    }
};
module.exports = { loginUser ,fetchUserInfo,updateUserContributions,insertDummyUser,updateUser};
