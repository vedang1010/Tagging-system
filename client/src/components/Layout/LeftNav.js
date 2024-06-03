// src/components/Layout/LeftNav.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const LeftNav = () => {
  return (
    <nav className="left-nav">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/components">
          <ListItemText primary="Components" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component={Link} to="/logout">
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </nav>
  );
};

export default LeftNav;
