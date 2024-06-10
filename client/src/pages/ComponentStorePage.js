// src/components/ComponentStore/ComponentStorePage.js
import React, { useState } from 'react';
import RightNav from '../components/Layout/RightNav';
import CustomCarousel from '../components/ComponentStore/Carousel';
import ComponentList from '../components/ComponentStore/ComponentList';
import { Grid } from '@mui/material';
import SearchBar from '../components/ComponentStore/SearchBar'
import '../styles/ComponentStore.css'



const ComponentStorePage = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9} md={12} >
          <SearchBar setShowSearchResults={setShowSearchResults} />
          {!showSearchResults && (
            <>
              <CustomCarousel />
              <ComponentList />
            </>
          )}
        </Grid>
        <Grid item xs={12} lg={3} className='left-right-grid'>
          <RightNav />
        </Grid>
      </Grid>
    </>
  );
};

export default ComponentStorePage;
