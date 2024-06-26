const User = require('../models/user');
const jwt = require('jsonwebtoken');
const{UserInfo,ExperienceSchema}=require("../models/userInfo")
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
                email: "techreview@gmail.com",
                name: "John Doe",
                imageUrl: "https://www.punestartupfest.in/images/navbarAndFooter/PSF24%20White.webp",
                about: "This is my about",
                designation: "Software Engineer",
                points: 120,
                dept: "Engineering",
                group: "A",
                subgroup: "technical",
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
                email: "legalreview@gmail.com",
                name: "Emily Johnson",
                imageUrl: "https://www.punestartupfest.in/images/navbarAndFooter/PSF24%20White.webp",
                about: "This is my about",
                designation: "Legal Counsel",
                points: 180,
                dept: "Legal",
                group: "B",
                subgroup: "legal",
                linkedinProfile: "https://www.linkedin.com/in/emilyjohnson",
                yearsOfExperience: 7,
                skills: ["Contract Law", "Intellectual Property", "Legal Compliance"],
                location: "Washington D.C., USA",
                ideasAccepted: 4,
                ideasProposed: 12,
                componentsAccepted: 6,
                componentsProposed: 9,
                experience: [
                    {
                        title: "Legal Counsel",
                        company: "Law & Co.",
                        period: "Jan 2019 - Present",
                        duration: "3 years"
                    },
                    {
                        title: "Associate Lawyer",
                        company: "Legal Solutions Ltd.",
                        period: "Jan 2016 - Dec 2018",
                        duration: "3 years"
                    }
                ],
                contributions: [
                    '6668258265a68659390b87cf',
                    '666853df5a37c0dfb0acdc2e'
                ]
            },
            {
                email: "functionalreview@gmail.com",
                name: "Michael Brown",
                imageUrl: "https://www.punestartupfest.in/images/navbarAndFooter/PSF24%20White.webp",
                about: "This is my about",
                designation: "Business Analyst",
                points: 150,
                dept: "Operations",
                group: "C",
                subgroup: "functional",
                linkedinProfile: "https://www.linkedin.com/in/michaelbrown",
                yearsOfExperience: 6,
                skills: ["Business Analysis", "Process Improvement", "Data Analysis"],
                location: "Chicago, USA",
                ideasAccepted: 3,
                ideasProposed: 8,
                componentsAccepted: 4,
                componentsProposed: 7,
                experience: [
                    {
                        title: "Business Analyst",
                        company: "Biz Solutions Inc.",
                        period: "Feb 2018 - Present",
                        duration: "4 years"
                    },
                    {
                        title: "Operations Analyst",
                        company: "OpEx Ltd.",
                        period: "Jan 2014 - Jan 2018",
                        duration: "4 years"
                    }
                ],
                contributions: [
                    '666853df5a37c0dfb0acdc2f'
                ]
            },
            {
                email: "testuser@gmail.com",
                name: "Jane Smith",
                imageUrl: "https://www.punestartupfest.in/images/navbarAndFooter/PSF24%20White.webp",
                about: "This is my about",
                designation: "Product Manager",
                points: 200,
                dept: "Product",
                group: "B",
                subgroup: "user",
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
        
console.log(data)
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
        // Log the user details for debugging
        console.log("user", user);
        console.log("user", user.name);

        // Create the update object with the new user data
        const updateData = {
            email: user.email,
            name: user.name,
            imageUrl: user.avatarUrl,
            about: user.about,
            designation: user.designation,
            points: user.points,
            dept: user.department,
            group: user.group,
            subgroup: user.subgroup,
            linkedinProfile: user.linkedin,
            yearsOfExperience: user.experience,
            skills: user.skills,
            location: user.location, // Assuming location is correctly formatted in user object
            ideasAccepted: user.ideas.accepted,
            ideasProposed: user.ideas.proposed,
            componentsAccepted: user.components.accepted,
            componentsProposed: user.components.proposed,
            experience: user.jobDetails,
            contributions: user.contributionIds, // Assuming user.contributionIds is correctly formatted in user object
        };

        // Find the user by ID and update with new user data
        const updatedUser = await UserInfo.findByIdAndUpdate(
            id,
            updateData,
            { new: true, overwrite: true } // Return the updated document
        );
        console.log("userid", id);

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
