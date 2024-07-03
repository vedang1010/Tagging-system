
import React from 'react';
import styles from '../styles/HomePage.module.css';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import Hero from '../components/Home/Hero';
import UploadIdeaHome from '../components/Home/UploadIdeaHome';
import Issues from '../components/Home/Issues';
import ComponentStore from '../components/Home/ComponentStore';


function HomePage() {  
  return (
    <>
    <Container>
      <Box className={styles.container} sx={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center' }}>
        <Hero/>
        <UploadIdeaHome />
        <Issues/>
        <ComponentStore/>
        
      </Box>
    </Container>
    
    </>
  );
}

export default HomePage;
