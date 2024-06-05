// src/components/ComponentStore/ComponentStorePage.js
import React from 'react';
import LeftNav from '../components/Layout/LeftNav';
import RightNav from '../components/Layout/RightNav';
import CustomCarousel from '../components/ComponentStore/Carousel';
import ComponentList from '../components/ComponentStore/ComponentList';
import { Grid } from '@mui/material';
// import SearchBar from './SearchBar';
import '../styles/ComponentStore.css'
const ComponentStorePage = () => {
    return (
        <>
        
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <CustomCarousel />
                <ComponentList />
            </Grid>
            <Grid item xs={4} className='left-right-grid'>
                <RightNav />
            </Grid>
        </Grid>
        </>

    );
};

export default ComponentStorePage;
