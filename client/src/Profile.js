import React from 'react';
import {
  Container, Typography, Paper, Box, Button, Avatar, Grid, Card, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText, TextField, InputAdornment, IconButton, Badge,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    points: 1200,
    badge: 'Diamond',
    avatarUrl: 'https://via.placeholder.com/150',
    designation: 'Designation',
    location: 'Pune',
    joined: 'January 2021',
    social: {
      twitter: '@johndoe',
      linkedin: 'linkedin.com/in/johndoe',
    },
    matchability: 74,
    cultureFit: 50,
    experience: 4,
    skills: ['UX Design', 'UX Research'],
    jobDetails: [
      {
        title: 'Sr. Interior Designer',
        company: 'Magma Pvt. Ltd.',
        period: 'Jan 2020 - Mar 2023',
        duration: '3 Years 3 Months',
      },
      // Add more job details here
    ],
  };

  const navigate = useNavigate();

  const handleComponentsPage = () => {
    navigate('/my-components');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box
        sx={{
          width: { xs: '100%', md: '250px' },
          backgroundColor: '#3f51b5',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 100, height: 100, marginBottom: 2 }} />
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2">{user.email}</Typography>
        <Divider sx={{ width: '100%', marginY: 2, backgroundColor: '#ffffff50' }} />
        <List component="nav">
          <ListItem button>
            <ListItemIcon><HomeIcon style={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><WorkIcon style={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="My Progress" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><AccountCircleIcon style={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Match Analysts" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><SettingsIcon style={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><HelpIcon style={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Help Center" />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', md: 'row' }}>
          <Typography variant="h4">Applicant Profile</Typography>
          <Box display="flex" alignItems="center" mt={{ xs: 2, md: 0 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ marginRight: 2 }}
            />
            {/* <IconButton>
              <Badge badgeContent={10} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton>
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar alt={user.name} src={user.avatarUrl} sx={{ marginLeft: 2 }} />
          </Box>
        </Box>

        <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'column', md: 'row' }}>
            <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} mb={{ xs: 2, md: 0 }}>
              <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 100, height: 100, marginRight: { sm: 3 }, marginBottom: { xs: 2, sm: 0 } }} />
              <Box textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="body1" color="textSecondary">{user.designation}</Typography>
                <Typography variant="body2" color="textSecondary">{user.location}</Typography>
                <Typography variant="body2" color="textSecondary">Joined: {user.joined}</Typography>
              </Box>
            </Box>
            <Button variant="contained" color="primary" onClick={handleComponentsPage}>My Components</Button>
          </Box>
        </Paper>

        {/* <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Matchability</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h4" color="primary">{user.matchability}%</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>Years of Experience: {user.experience}</Typography>
              </Box>
              <Box display="flex" flexWrap="wrap" mt={2}>
                {user.skills.map((skill, index) => (
                  <Box key={index} sx={{ backgroundColor: '#3f51b5', color: '#fff', borderRadius: 1, padding: 0.5, margin: 0.5 }}>
                    {skill}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6">Culture Fit</Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h4" color="primary">{user.cultureFit}%</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>Required Skills</Typography>
              </Box>
              <Box display="flex" flexWrap="wrap" mt={2}>
                {user.skills.map((skill, index) => (
                  <Box key={index} sx={{ backgroundColor: '#3f51b5', color: '#fff', borderRadius: 1, padding: 0.5, margin: 0.5 }}>
                    {skill}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid> */}

        <Divider sx={{ marginY: 3 }} />

        {/* <Grid container spacing={3}>
          {user.jobDetails.map((job, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{job.company}</Typography>
                  <Typography variant="body2" color="textSecondary">{job.period}</Typography>
                  <Typography variant="body2" color="textSecondary">{job.duration}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        <Divider sx={{ marginY: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Points</Typography>
                <Typography variant="h4" color="primary">{user.points}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Badge</Typography>
                <Box display="flex" alignItems="center">
                  <StarIcon color="secondary" />
                  <Typography variant="h4" color="primary" sx={{ marginLeft: 1 }}>{user.badge}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
