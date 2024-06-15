// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, IconButton, Badge, Divider } from '@mui/material';
import { Notifications as NotificationsIcon, TempleBuddhistRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AvatarSection from '../components/profile/components/AvatarSection';
import Sidebar from '../components/profile/components/Sidebar';
import UserInfo from '../components/profile/components/UserInfo';
import ProgressCards from '../components/profile/components/ProgressCards';
import Contributions from '../components/profile/components/Contributions';
// import '../styles/Profile.css';
import Footer from "../components/Footer"

const Profile = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;



  const initialUser = {
    name: 'ABC',
    email: 'abc.def@example.com',
    points: 1200,
    badge: 'Diamond',
    avatarUrl: 'https://via.placeholder.com/150',
    designation: 'Senior Developer',
    department: 'DTS',
    location: 'Pune',
    joined: 'January 2021',
    twitter: '@abc',
    linkedin: 'linkedin.com/in/abc',
    experience: 4,
    about: 'Senior Developer at DTS, with a passion for UX Design and Research.',
    skills: ['UX Design', 'UX Research'],
    jobDetails: [
      {
        title: 'Sr. Interior Designer',
        company: 'Magma Pvt. Ltd.',
        period: 'Jan 2020 - Mar 2023',
        duration: '3 Years 3 Months',
      },
    ],
    ideas: {
      accepted: 8,
      proposed: 15,
    },
    components: {
      accepted: 5,
      proposed: 10,
    },
    contributions: [
      {
        period: 'June 2024',
        activity: 'No activity yet for this period',
      },
      {
        period: 'May 2024',
        activities: [
          'Created 1 commit in 1 repository',
          'Opened 1 pull request in 1 repository'
        ],
        repositories: [
          'Manthan600/Tagging-system'
        ]
      },
      {
        period: 'April 2024',
        activities: [
          'Created 125 commits in 4 repositories',
          'Created 1 repository',
          'Opened 21 pull requests in 2 repositories'
        ],
        repositories: [
          'vedang1010/COEP-Tech-Hackathon',
          'vaishnavi775/Hackathon',
          'vedang1010/Decentralized-Web-Hosting-using-BlockChain',
          'vedang1010/vedang1010'
        ]
      },
      {
        period: 'March 2024',
        activities: [
          'Created 85 commits in 3 repositories',
          'Opened 15 pull requests in 2 repositories'
        ],
        repositories: [
          'project-x/repository-one',
          'project-y/repository-two',
          'project-z/repository-three'
        ]
      },
      {
        period: 'February 2024',
        activities: [
          'Created 65 commits in 2 repositories',
          'Opened 10 pull requests in 1 repository'
        ],
        repositories: [
          'example-repo/awesome-project',
          'example-repo2/cool-library'
        ]
      },
    ],
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [visibleContributions, setVisibleContributions] = useState(3);

  const navigate = useNavigate();
  const calculatePoints = (points) => {
    if (points > 100) {
      return "Master";
    }
    if (points > 1000) {
      return "Hero"
    }
  }

  useEffect(() => {

    const getUserInfo = async (id) => {
      try {
        const url = `${SERVER_URL}api/review/fetchUserInfo/${id}`;
        // console.log(url);
        const response = await axios.get(url);
        // console.log("Profile user:", response.data[0].name);
        return response.data[0]; // Assuming response.data contains a user object with an 'email' field
      } catch (error) {
        console.error(`Error fetching user info: ${error.message}`);
      }
    };

    const fetchContributions = async (id) => {
      try {
        const url = `${SERVER_URL}api/componentCard/fetchComponentByIds`;
        const response = await axios.post(url, { ids: id });
        console.log("contributions user:", response.data);
        const fetchedContributions = response.data;

        // Ensure fetchedContributions is an array
        const contributionsArray = Array.isArray(fetchedContributions) ? fetchedContributions : [];

        // Initialize an empty array for the processed contributions
        const tempArray = [];

        // Use a for loop to process each contribution
        for (let i = 0; i < contributionsArray.length; i++) {
          const contribution = contributionsArray[i];
          const activities = [];
          const repositories = [];

          if (contribution.idea) {
            activities.push(contribution.idea);
          } else {
            activities.push('No activity yet for this period');
          }

          if (contribution.repositories && contribution.repositories.length > 0) {
            repositories.push(...contribution.repositories);
          }

          // Assuming 'contribution' has a structure that matches the provided example, adapt as necessary
          if (contribution.contributors && contribution.contributors.length > 0) {
            for (let j = 0; j < contribution.contributors.length; j++) {
              const contributor = contribution.contributors[j];
              if (contributor.activityDetails) {
                activities.push(...contributor.activityDetails);
              }
            }
          }

          // Add the processed contribution to the tempArray
          tempArray.push({
            period: contribution.contributors?.[contribution.contributors.length - 1]?.date || 'Unknown period',
            activities,
            repositories
          });
        }

        // Print each object in `tempArray` as a JSON string
        tempArray.forEach(item => console.log("hello", item));
        console.log("baddy", tempArray);
        // setUser({ contributions: tempArray });
        // user.contributions=tempArray
        // console.log("fbfbv", user.contributions)
        // console.log("fbfbv",user.contributions.length)

        return tempArray;
      } catch (error) {
        console.error(`Error fetching user info: ${error.message}`);
        return [];
      }
    };

    const fetchUserData = async () => {
      const userId = localStorage.getItem('user');
      // console.log(userId);
      if (userId) {
        const userData = await getUserInfo(userId);
        // console.log("Fetched user data:", userData);
        //fetch contributions and calculate badge
        // Construct anotherUser with the required fields
        const contri =await fetchContributions(userData.contributions)
        console.log("i sm contri",contri)

        const anotherUser = {
          name: userData.name,
          email: userData.email,
          points: userData.points,
          badge: calculatePoints(userData.points),
          avatarUrl: userData.imageUrl,
          designation: userData.designation,
          department: userData.dept,
          location: userData.location,

          linkedin: userData.linkedinProfile,
          experience: userData.yearsOfExperience,
          about: userData.about,
          skills: userData.skills,
          jobDetails: userData.experience,
          ideas: {
            accepted: userData.ideasAccepted,
            proposed: userData.ideasProposed,
          },
          components: {
            accepted: userData.componentsAccepted,
            proposed: userData.componentsProposed,
          },
          contributions:contri,
        };
        // console.log("Constructed user:", anotherUser);
        setUser(anotherUser);
        // console.log("Constructed user:", user);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleJobChange = (e, index) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedJobs = [...prevUser.jobDetails];
      updatedJobs[index] = { ...updatedJobs[index], [name]: value };
      return { ...prevUser, jobDetails: updatedJobs };
    });
  };

  const handleAddJob = () => {
    setUser((prevUser) => ({
      ...prevUser,
      jobDetails: [
        ...prevUser.jobDetails,
        { title: '', company: '', period: '', duration: '' },
      ],
    }));
  };

  const handleRemoveJob = (index) => {
    setUser((prevUser) => {
      const updatedJobDetails = prevUser.jobDetails.filter((_, i) => i !== index);
      return { ...prevUser, jobDetails: updatedJobDetails };
    });
  };

  const handleLoadMoreContributions = () => {
    setVisibleContributions((prevVisible) => prevVisible + 1);
  };

  const getProgressValue = (accepted, proposed) => (accepted / proposed) * 100;

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', backgroundColor: '#e3f2fd', width: '100%' }}>
        <Sidebar user={user} />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', md: 'row' }}>
            <Typography variant="h4">User Profile</Typography>
            {/* <Box display="flex" alignItems="center" mt={{ xs: 2, md: 0 }}>
              <IconButton>
                <Badge badgeContent={10} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Box> */}
          </Box>
          <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
            <AvatarSection
              user={user}
              isEditing={isEditing}
              handleEditProfile={handleEditProfile}
              handleSaveProfile={handleSaveProfile}
            />
          </Paper>
          <UserInfo
            user={user}
            isEditing={isEditing}
            handleChange={handleChange}
            handleJobChange={handleJobChange}
            handleAddJob={handleAddJob}
            handleRemoveJob={handleRemoveJob}
          />
          {!isEditing && (
            <>
              <ProgressCards user={user} getProgressValue={getProgressValue} />
              <Divider sx={{ marginY: 3 }} />
              <Contributions
                user={user}
                visibleContributions={visibleContributions}
                handleLoadMoreContributions={handleLoadMoreContributions}
              />
            </>
          )}
        </Box>
      </Box>
      {/* <Footer/> */}
    </>
  );
};

export default Profile;
