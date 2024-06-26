// src/components/ComponentStore/ComponentStorePage.js
import React, { useState, useRef } from 'react';
import RightNav from '../components/Layout/RightNav';
import CustomCarousel from '../components/ComponentStore/Carousel';
import ComponentList from '../components/ComponentStore/ComponentList';
import { Grid } from '@mui/material';
import SearchBar from '../components/ComponentStore/SearchBar'
import '../styles/ComponentStore.css'



const ComponentStorePage = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [query, setQuery] = useState('');
  sessionStorage.setItem("location","/componentstore")
  const [result, setResults] = useState([]);
  const [dept, setDept] = useState([]);

  const SearchBarRef = useRef();

  const hanleApplyClick = () =>{
    // console.log("apply clicked");
    // if (SearchBarRef.current){
    console.log("apply clicked");

      SearchBarRef.current.handleSearch();
    // }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}  md={10}  sm={12}>
          <SearchBar setShowSearchResults={setShowSearchResults} tags={result} dept={dept} ref={SearchBarRef}/>
          {!showSearchResults && (
            <>
              <CustomCarousel />
              <ComponentList />
            </>
          )}
        </Grid>
        <Grid item xs={12} md ={2}  className='left-right-grid'>
          <RightNav setResults={setResults} setDept={setDept} hanleApplyClick={hanleApplyClick}/>
        </Grid>
      </Grid>
    </>
  );
};

export default ComponentStorePage;
