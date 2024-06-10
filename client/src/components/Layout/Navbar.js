import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Box, useTheme, useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle } from '@mui/icons-material';

function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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
      <div style={{display:"flex", flexDirection: "column"}}>

      <MenuItem onClick={handleMenuClose}>Login</MenuItem>
      <MenuItem onClick={handleMenuClose}>View Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </div>
    </Menu>
  );

  const sideList = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Toolbar />
      <List sx={{flexDirection:"column"}}>
        {['Home', 'Dashboard', 'Settings', 'Profile','UploadComponent','UploadIdea','ComponentStore'].map((text, index) => (
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
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 1, width: 'auto', ml: 2, mr: 2 }}>
            <SearchIcon sx={{ p: 1 }} />
            <InputBase
              placeholder="Search…"
              sx={{ color: 'inherit', ml: 1, flex: 1 }}
            />
          </Box>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
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
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width:"13rem"},
        }}
      >
        {sideList}
      </Drawer>
      {renderMenu}
    </Box>
  );
}

export default Navbar;
