// src/components/Contributions.js
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Button, Box } from '@mui/material';
import "../styles/Profile.css"

const Contributions = ({ user, visibleContributions, handleLoadMoreContributions }) => (
  <Paper elevation={3} sx={{ padding: 4, marginBottom: 3 }}>
    <Typography variant="h6">Contributions</Typography>
    <List className="contributions-list">
      {user.contributions.slice(0, visibleContributions).map((contribution, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemText
              className="contribution-list"
              primary={contribution.period}
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
      ))}
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

export default Contributions;
