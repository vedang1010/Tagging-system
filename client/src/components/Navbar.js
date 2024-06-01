import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import styles from '../styles/Navbar.module.css'; // Correct import for CSS modules

function Navbar() {
  return (
    // <AppBar position="static">
    //   <Toolbar>
    //     <Typography variant="h6">
    //       Component Store
    //     </Typography>
    //   </Toolbar>
    // </AppBar>
    <div className={styles.navbar}>
      <a href="#home">Home</a>
      <a href="#about-us">About Us</a>
      <a href="#contacts">Contacts</a>
      <a href="#feedback">Feedback</a>
    </div>
  );
}

export default Navbar;
