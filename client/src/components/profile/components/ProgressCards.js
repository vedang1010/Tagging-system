// src/components/ProgressCards.js
import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const COLORS = ['#1e88e5', '#d32f2f'];

const ProgressPieChart = ({ accepted, proposed, title }) => {
  const data = [
    { name: 'Accepted', value: accepted },
    { name: 'Proposed', value: proposed - accepted },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <CheckCircleIcon fontSize="small" sx={{ color: '#1e88e5', marginRight: 0.5 }} />
          <span>{accepted}</span>
          <Typography variant="caption" sx={{ marginLeft: 0.5, marginRight: 0.5 }}>
            / {proposed}
          </Typography>
          <ErrorIcon fontSize="small" sx={{ color: '#d32f2f' }} />
        </Box>
      </Typography>
    </Box>
  );
};

const ProgressCards = ({ user }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" color="primary">Ideas Stats</Typography>
          <ProgressPieChart
            accepted={user.ideas.accepted}
            proposed={user.ideas.proposed}
            title="Ideas"
          />
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={6}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" color="primary">Components Stats</Typography>
          <ProgressPieChart
            accepted={user.components.accepted}
            proposed={user.components.proposed}
            title="Components"
          />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default ProgressCards;
