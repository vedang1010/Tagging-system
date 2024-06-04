// src/components/ProgressCards.js
import React from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

const ProgressCards = ({ user, getProgressValue }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" color="primary">Ideas Accepted/Proposed</Typography>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <CircularProgress variant="determinate" value={getProgressValue(user.ideas.accepted, user.ideas.proposed)} size={80} sx={{ color: '#1e88e5' }} />
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
              {user.ideas.accepted} / {user.ideas.proposed}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" color="primary">Components Accepted/Proposed</Typography>
          <Box display="flex"           alignItems="center" justifyContent="center" flexDirection="column">
            <CircularProgress variant="determinate" value={getProgressValue(user.components.accepted, user.components.proposed)} size={80} sx={{ color: '#1e88e5' }} />
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
              {user.components.accepted} / {user.components.proposed}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default ProgressCards;
