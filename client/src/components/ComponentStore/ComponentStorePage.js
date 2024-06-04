// src/components/ComponentStore/ComponentStorePage.js
import React from 'react';
import LeftNav from '../Layout/LeftNav';
import RightNav from '../Layout/RightNav';
import CustomCarousel from './Carousel';
import ComponentList from './ComponentList';
import { Grid } from '@mui/material';
import SearchBar from './SearchBar';
const ComponentStorePage = () => {
    return (
        <>
        {/* <SearchBar /> */}
        <Grid container spacing={2}>
            
            <Grid item xs={2} className='left-right-grid'>
                <LeftNav />
            </Grid>
            <Grid item xs={8}>
                
                <CustomCarousel />
                <ComponentList />
            </Grid>
            <Grid item xs={2} className='left-right-grid'>
                <RightNav />
            </Grid>
        </Grid>
        </>

    );
};

export default ComponentStorePage;
