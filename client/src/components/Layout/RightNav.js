// src/components/Layout/RightNav.js
import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';

const RightNav = () => {
  return (
    <Box className="right-nav">
      <Typography variant="h6" component="div">
        Filters
      </Typography>
      <FormControlLabel
        control={<Checkbox name="department1" />}
        label="Department 1"
      />
      <FormControlLabel
        control={<Checkbox name="department2" />}
        label="Department 2"
      />
      <FormControlLabel
        control={<Checkbox name="highRating" />}
        label="High Ratings"
      />
      <FormControlLabel
        control={<Checkbox name="lowRating" />}
        label="Low Ratings"
      />
    </Box>
  );
};

export default RightNav;
