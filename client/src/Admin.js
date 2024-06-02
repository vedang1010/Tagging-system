import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, TextField, Button, List, ListItem, ListItemText, IconButton, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './styles/Admin.css'; // Import the CSS file

const Admin = () => {
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
  const [activeComponent, setActiveComponent] = useState('userManagement');

  
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

    setFilteredReviewers(initialReviewers);
    setReviewers(initialReviewers);
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

  const renderComponent = () => {
    switch (activeComponent) {
      case 'userManagement':
        return (
          <Paper elevation={3} className="paper">
            <Typography variant="h5" component="h2" className="typography-h5" gutterBottom>
              User Management
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                label="Add a new reviewer"
                value={newReviewer}
                onChange={(e) => setNewReviewer(e.target.value)}
                variant="outlined"
                sx={{ marginRight: 2 }}
                className="text-field"
              />
              <TextField
                select
                label="Select Category"
                value={newReviewerCategory}
                onChange={(e) => setNewReviewerCategory(e.target.value)}
                variant="outlined"
                sx={{ width: 200, marginRight: 2 }}
                className="text-field"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category} className="menu-item">
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddReviewer}
                className="button-contained-primary"
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
                className="text-field"
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category} className="menu-item">
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
        );
      case 'componentsStats':
        return (
          <Paper elevation={3} className="paper">
            <Typography variant="h5" component="h2" className="typography-h5" gutterBottom>
              Components Statistics
            </Typography>
            <Typography variant="body1">Total components: {componentsStats.total}</Typography>
            <Typography variant="body1">Reused components: {componentsStats.reused}</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  className="pie"
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
        );
      case 'issuesStats':
        return (
          <Paper elevation={3} className="paper">
            <Typography variant="h5" component="h2" className="typography-h5" gutterBottom>
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
        );
      case 'departmentContributions':
        return (
          <Paper elevation={3} className="paper" sx={{ padding: 2, marginTop: 3 }}>
            <Typography variant="h5" component="h2" className="typography-h5" gutterBottom>
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
        );
      case 'rewardSystem':
        return (
          <Paper elevation={3} className="paper">
            <Typography variant="h5" component="h2" className="typography-h5" gutterBottom>
              Reward System
            </Typography>
            <TableContainer className="table-container">
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
                          className="text-field"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={reward.reward}
                          onChange={(e) => handleRewardChange(index, 'reward', e.target.value)}
                          className="text-field"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box display="flex" justifyContent="center" m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateRewards}
                  className="button-contained-primary"
                >
                  Update Rewards
                </Button>
              </Box>
            </TableContainer>
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
  <Container className="admin-container" maxWidth="" style={{ display: 'flex' }}>
      <Box className="navbar">
        <Button
          className={activeComponent === 'userManagement' ? 'active' : ''}
          onClick={() => setActiveComponent('userManagement')}
        >
          User Management
        </Button>
        <Button
          className={activeComponent === 'componentsStats' ? 'active' : ''}
          onClick={() => setActiveComponent('componentsStats')}
        >
          Components Statistics
        </Button>
        <Button
          className={activeComponent === 'issuesStats' ? 'active' : ''}
          onClick={() => setActiveComponent('issuesStats')}
        >
          Issues Statistics
        </Button>
        <Button
          className={activeComponent === 'departmentContributions' ? 'active' : ''}
          onClick={() => setActiveComponent('departmentContributions')}
        >
          Department Contributions
        </Button>
        <Button
          className={activeComponent === 'rewardSystem' ? 'active' : ''}
          onClick={() => setActiveComponent('rewardSystem')}
        >
          Reward System
        </Button>
      </Box>

      <Box className="content">
        {renderComponent()}
      </Box>
    </Container>
  );
};

export default Admin;
