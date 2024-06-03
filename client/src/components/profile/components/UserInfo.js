// src/components/UserInfo.js
import React from 'react';
import { Box, Paper, Grid, TextField, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserInfo = ({ user, isEditing, handleChange, handleJobChange, handleAddJob, handleRemoveJob }) => (
  <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
    {isEditing ? (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Designation"
            name="designation"
            value={user.designation}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={user.department}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={user.location}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="About"
            name="about"
            value={user.about}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Twitter"
            name="twitter"
            value={user.twitter}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="LinkedIn"
            name="linkedin"
            value={user.linkedin}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Experience"
            name="experience"
            value={user.experience}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Skills"
            name="skills"
            value={user.skills.join(', ')}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Job Details</Typography>
          {user.jobDetails.map((job, index) => (
            <Box key={index} display="flex" alignItems="center">
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={job.title}
                onChange={(e) => handleJobChange(e, index)}
                variant="outlined"
                margin="normal"
                sx={{ marginRight: 2 }}
              />
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={job.company}
                onChange={(e) => handleJobChange(e, index)}
                variant="outlined"
                margin="normal"
                sx={{ marginRight: 2 }}
              />
              <TextField
                fullWidth
                label="Period"
                name="period"
                value={job.period}
                onChange={(e) => handleJobChange(e, index)}
                variant="outlined"
                margin="normal"
                sx={{ marginRight: 2 }}
              />
              <TextField
                fullWidth
                label="Duration"
                name="duration"
                value={job.duration}
                onChange={(e) => handleJobChange(e, index)}
                variant="outlined"
                margin="normal"
                sx={{ marginRight: 2 }}
              />
              <IconButton onClick={() => handleRemoveJob(index)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAddJob} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Add Job
          </Button>
        </Grid>
      </Grid>
    ) : (
      <>
        <Typography variant="h6">About Me</Typography>
        <Typography variant="body1" color="textSecondary">
          {user.about}
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>Experience</Typography>
        <List>
          {user.jobDetails.map((job, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={job.title}
                secondary={`${job.company} - ${job.period} (${job.duration})`}
              />
            </ListItem>
          ))}
        </List>
      </>
    )}
  </Paper>
);

export default UserInfo;
