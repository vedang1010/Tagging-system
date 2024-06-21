// src/components/Contributions.js
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Button, Box } from '@mui/material';
import "../styles/Profile.css";

const Contributions = ({ user, visibleContributions, handleLoadMoreContributions }) => {
  const contributionsToShow = [];
  // console.log('ddd',user.contributions)
  // console.log('dddf',user.contributions.length)
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  };
  for (let index = 0; index < user.contributions.length; index++) {
    if (index < visibleContributions) {
      const contribution = user.contributions[index];
      // console.log('ddd',user.contributions)
      contributionsToShow.push(
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText
              className="contribution-list"
              primary={formatDate(contribution.period)}
              secondary={Array.isArray(contribution.activities) ? (
                <List>
                  {contribution.activities.map((activity, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={activity} className="contribution-list" />
                    </ListItem>
                  ))}
                  <Typography variant="body2" color="textSecondary">
                    Repositories:
                  </Typography>
                  {contribution.repositories.map((repo, j) => (
                    <ListItem key={j}>
                      <ListItemText primary={repo} className="contribution-list" />
                    </ListItem>
                  ))}
                </List>
              ) : (
                contribution.activity
              )}
            />
          </ListItem>
          {index < user.contributions.length - 1 && <Divider />}
        </React.Fragment>
      );
    }
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
      <Typography variant="h6">Contributions</Typography>
      <List className="contributions-list">
        {contributionsToShow}
      </List>
      {visibleContributions < user.contributions.length && (
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleLoadMoreContributions}>
            Load More Contributions
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Contributions;
