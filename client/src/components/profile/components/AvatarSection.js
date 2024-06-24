// src/components/AvatarSection.js
import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
// import 'client/src/styles/Profile.css';
import "../styles/Profile.css"
// import ""

const AvatarSection = ({ user, isEditing, handleEditProfile, handleSaveProfile }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'column', md: 'row' }}>
    <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} mb={{ xs: 2, md: 0 }}>
      <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 100, height: 100, marginRight: { sm: 3 }, marginBottom: { xs: 2, sm: 0 } }} />
      <Box textAlign={{ xs: 'center', sm: 'left' }}>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1" color="textSecondary">{user.designation}</Typography>
        <Typography variant="body1" color="textSecondary">{user.department}</Typography>
        <Typography variant="body2" color="textSecondary">{user.location}</Typography>
        <Typography variant="body2" color="textSecondary">Joined: {user.joined}</Typography>
      </Box>
    </Box>
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box className="card-small">
        <StarIcon className="card-icon" />
        <Typography variant="h6" className="card-text">{user.points}</Typography>
      </Box>
      <Box className="card-small">
        <StarIcon className="card-icon" />
        <Typography variant="h6" className="card-text">{user.badge}</Typography>
      </Box>
      {isEditing ? (
        <Button variant="contained" sx={{ backgroundColor: '#0a1324', color: '#fff' }} onClick={handleSaveProfile}>Save Profile</Button>
      ) : (
        <Button 
        variant="contained" 
        sx={{ backgroundColor: '#0a1324', color: '#fff' }} 
        onClick={handleEditProfile}
      >
        Edit Profile
      </Button>      )}
    </Box>
  </Box>
);

export default AvatarSection;
