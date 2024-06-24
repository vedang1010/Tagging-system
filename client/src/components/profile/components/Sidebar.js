// src/components/Sidebar.js
import React from 'react';
import { Box, Typography, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home as HomeIcon, Work as WorkIcon, Settings as SettingsIcon, Help as HelpIcon } from '@mui/icons-material';

const Sidebar = ({ user, onMenuItemClick }) => (
  <Box
    sx={{
      width: { xs: '100%', md: '250px' },
      backgroundColor: '#0a1324',
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
      <ListItem button onClick={() => onMenuItemClick('dashboard')}>
        <ListItemIcon><HomeIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => onMenuItemClick('myComponents')}>
        <ListItemIcon><WorkIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="My Components" />
      </ListItem>
      <ListItem button onClick={() => onMenuItemClick('settings')}>
        <ListItemIcon><SettingsIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button onClick={() => onMenuItemClick('help')}>
        <ListItemIcon><HelpIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Help Center" />
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
