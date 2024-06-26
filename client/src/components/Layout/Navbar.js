import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Badge, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Box, useTheme, useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css'
import socket from '../../module/socket'


function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newNotifications, setnewNotificationsOpen] = useState(false);
  const subgroup = localStorage.getItem("subgroup")

  useEffect(() => {
    socket.on("statusUpdate", (data) => {
      console.log(`${socket.id} statusUpdate:`, JSON.stringify(data, null, 2));
      setnewNotificationsOpen(true)
    });

    socket.on('modifyComponent', (data) => {
      console.log(`${socket.id} modifyComponent:`, JSON.stringify(data, null, 8));
      setnewNotificationsOpen(true)
    });

    
  }, [socket]);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNotificationsClick = () => {
    navigate('/notifications');
  };

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu 
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to={'/profile'}><MenuItem onClick={handleMenuClose}>View Profile</MenuItem></Link>
        <Link to={'/logout'}><MenuItem onClick={handleMenuClose}>Logout</MenuItem></Link>
      </div>
    </Menu>
  );

  const sideList = (
    <Box
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <Toolbar />
      <List sx={{ flexDirection: "column" }}>
        {['Home', 'UploadIdea', 'ComponentStore', 'CurrentIssues','ReviewIdea','ReviewComponent'].map((text, index) => {
          if (subgroup === 'user' && (text === 'ReviewIdea' || text === 'ReviewComponent')) {
            console.log("reached1")

            return null; // Do not render these items based on subgroup
          }

          if  ((subgroup === 'functional' && text === 'ReviewComponent')) {
            console.log("reached2")
            return null; // Do not render these items based on subgroup
          }
          if ( (subgroup === 'technical' || subgroup === 'legal') && text === 'ReviewIdea') {
            console.log("reached3")
            return null; // Do not render these items based on subgroup
          }
          return (
            <NavLink 
              to={`/${text.toLowerCase()}`} 
              key={index} 
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={isSmallScreen ? handleDrawerClose : null}
            >
              <ListItem button>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#0a1324', zIndex:1300 }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationsClick}>
            {newNotifications ? (
              <Badge variant="dot" color="secondary">
                <NotificationsIcon />
              </Badge>
            ) : (
              <NotificationsIcon />
            )}
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer 
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        open={isSmallScreen ? drawerOpen : true}
        onClose={toggleDrawer()}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box'},
          '@media (min-width: 900px)':{
            '& .MuiDrawer-paper':{
              width: '15%',
            },
          },
            '@media (max-width: 900px)':{
            '& .MuiDrawer-paper':{
              width: '13rem',
            },
          }
            
        }
        }
      >
        {sideList}
      </Drawer>
      {renderMenu}
    </Box>
  );
}

export default Navbar;
