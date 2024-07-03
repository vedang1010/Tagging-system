
import React from 'react';
import styles from '../styles/HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import Hero from '../components/Home/Hero';
import UploadIdeaHome from '../components/Home/UploadIdeaHome';
import Issues from '../components/Home/Issues';


function HomePage() {

  const navigate = useNavigate();
  const uploadIdeaHomeHandler = () =>{
    navigate('/uploadidea');
  }

  const heroHandler = () =>{
    navigate('/home');
    
  }

  const issuesHandler = () =>{
    navigate('/currentissues');
  }
  return (
    <>
    <Container>
      <Box className={styles.container} sx={{ display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center' }}>
        <Hero onClick={heroHandler}/>
        <UploadIdeaHome onClick={uploadIdeaHomeHandler}/>
        <Issues onClick={issuesHandler}/>
        
      </Box>
    </Container>
    
    </>
  );
}

export default HomePage;
