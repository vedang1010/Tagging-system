// src/components/Profile.js
import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Badge, Divider } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AvatarSection from './components/profile/components/AvatarSection';
import Sidebar from './components/profile/components/Sidebar';
import UserInfo from './components/profile/components/UserInfo';
import ProgressCards from './components/profile/components/ProgressCards';
import Contributions from './components/profile/components/Contributions';
import './styles/Profile.css';
import Footer from "./components/Footer"
const Profile = () => {
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
    about:'Senior Developer at DTS, with a passion for UX Design and Research.',
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
      updatedJobs[index] = { ...updatedJobs[index],
        [name]: value,
      };
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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', backgroundColor: '#e3f2fd' }}>
      <Sidebar user={user} />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', md: 'row' }}>
          <Typography variant="h4">User Profile</Typography>
          <Box display="flex" alignItems="center" mt={{ xs: 2, md: 0 }}>
            <IconButton>
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
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
    <Footer/>
    </>
  );
};

export default Profile;
