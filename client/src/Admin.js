import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Admin.css'; // Import the CSS file
const Admin = () => {
  // const [reviewers, setReviewers] = useState([]); 
  const [newReviewer, setNewReviewer] = useState('');
  const [newReviewerCategory, setNewReviewerCategory] = useState('');
  const categories = ['Functional', 'Legal', 'Technical'];
  const [componentsStats, setComponentsStats] = useState({
    total: 0,
    reused: 0,
    pending: 0,
    rejected: 0,
    accepted: 0,
  });
  const [reviewers, setReviewers] = useState([]);
  const [filteredReviewers, setFilteredReviewers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [issuesStats, setIssuesStats] = useState([]);
  const [departmentContributions, setDepartmentContributions] = useState([]);
  const [rewardSystem, setRewardSystem] = useState([]);
  const [editedRewardSystem, setEditedRewardSystem] = useState([]);

  useEffect(() => {
    const initialRewards = [
      { rank: "5.00 - 4.00", reward: '100' },
      { rank: "3.99 - 3.00", reward: '85' },
      { rank: "2.99 - 2.0 ", reward: '60' },
      { rank: "1.99 - 0.00 ", reward: '40' },
    ];
    const initialReviewers = [
      { name: 'Reviewer1', category: 'Functional' },
      { name: 'Reviewer2', category: 'Legal' },
      { name: 'Reviewer3', category: 'Technical' },
      { name: 'Reviewer4', category: 'Functional' },
      { name: 'Reviewer5', category: 'Legal' },
    ];
  
      setFilteredReviewers(initialReviewers)
    setReviewers(initialReviewers)
    setComponentsStats({
      total: 100,
      reused: 50,
      pending: 10,
      rejected: 5,
      accepted: 85,
    });
    setIssuesStats([
      { month: 'January', issuesRaised: 10, issuesSolved: 5 },
      { month: 'February', issuesRaised: 15, issuesSolved: 7 },
      { month: 'March', issuesRaised: 8, issuesSolved: 6 },
    ]);
    setDepartmentContributions([
      { department: 'DTS', contributions: 40 },
      { department: 'SB', contributions: 20 },
      { department: 'Mobility', contributions: 15 },
      { department: 'HR', contributions: 10 },
    ]);
    setRewardSystem(initialRewards);
    setEditedRewardSystem(initialRewards);
  }, []);

  const handleAddReviewer = () => {
    if (newReviewer && newReviewerCategory && !reviewers.some(reviewer => reviewer.name === newReviewer)) {
      setReviewers([...reviewers, { name: newReviewer, category: newReviewerCategory }]);
      setNewReviewer('');
      setNewReviewerCategory('');
    }
  };
  
  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredReviewers(reviewers);
    } else {
      setFilteredReviewers(reviewers.filter(reviewer => reviewer.category === category));
    }
  };

  const handleRemoveReviewer = (reviewerToRemove) => {
    setReviewers(reviewers.filter(reviewer => reviewer.name !== reviewerToRemove));
  };

  const handleRewardChange = (index, field, value) => {
    const newEditedRewardSystem = [...editedRewardSystem];
    newEditedRewardSystem[index][field] = value;
    setEditedRewardSystem(newEditedRewardSystem);
  };

  const handleUpdateRewards = () => {
    setRewardSystem(editedRewardSystem);
  };

  const pieData = [
    { name: 'Pending', value: componentsStats.pending },
    { name: 'Rejected', value: componentsStats.rejected },
    { name: 'Accepted', value: componentsStats.accepted },
  ];

  const COLORS = ['#FFBB28', '#FF8042', '#0088FE'];

  return (
    <Container className="admin-container" maxWidth="">
    {/* <> */}

      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          User Management
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="Add a new reviewer"
            value={newReviewer}
            onChange={(e) => setNewReviewer(e.target.value)}
            variant="outlined"
            sx={{ marginRight: 2 }}
          />
          <TextField
            select
            label="Select Category"
            value={newReviewerCategory}
            onChange={(e) => setNewReviewerCategory(e.target.value)}
            variant="outlined"
            sx={{ width: 200, marginRight: 2 }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddReviewer}
          >
            Add Reviewer
          </Button>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            select
            label="Filter by Category"
            value={selectedCategory}
            onChange={(e) => handleFilterByCategory(e.target.value)}
            variant="outlined"
            sx={{ width: 200, marginRight: 2 }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <List>
          {filteredReviewers.map(reviewer => (
            <ListItem key={reviewer.name} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveReviewer(reviewer.name)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={reviewer.name} secondary={`Category: ${reviewer.category}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Components Statistics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Issues Statistics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={issuesStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="issuesRaised" fill="#8884d8" />
                <Bar dataKey="issuesSolved" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Department Contributions
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart layout="vertical" data={departmentContributions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="department" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="contributions" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Reward System
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stars</TableCell>
                <TableCell>Points Multiplier</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedRewardSystem.map((reward, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={reward.rank}
                      onChange={(e) => handleRewardChange(index, 'rank', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={reward.reward}
                      onChange={(e) => handleRewardChange(index, 'reward', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="center" m={2}>
            <Button variant="contained" color="primary" onClick={handleUpdateRewards}>
              Update Rewards
            </Button>
          </Box>
        </TableContainer>
      </Paper>
        
      {/* </> */}
    </Container>
  );
};

export default Admin;
