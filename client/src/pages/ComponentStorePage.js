// src/components/ComponentStore/ComponentStorePage.js
import React, { useState, useRef } from 'react';
import RightNav from '../components/Layout/RightNav';
import CustomCarousel from '../components/ComponentStore/Carousel';
import ComponentList from '../components/ComponentStore/ComponentList';
import { Button, Grid } from '@mui/material';
import SearchBar from '../components/ComponentStore/SearchBar'
import '../styles/ComponentStore.css'
import BasicModal from '../components/ComponentStore/BasicModal';
import axios from 'axios';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;



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




  const [tags,setTags] = React.useState([]);
  React.useEffect(() => {
    const fetchTags = async () => {
      console.log('RightNav mounted');
      try {
        // get all tags
        const tags_res = await axios.get(`${SERVER_URL}api/ComponentStore/getAllTags`);
        setTags(tags_res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTags();
  }, []);



  const dept_arr = ['DTS','MO','SB'];

  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={12}  md={10}  sm={12}>
          <SearchBar setShowSearchResults={setShowSearchResults} tags={result} dept={dept} ref={SearchBarRef}/>

          <BasicModal setResults={setResults} setDept={setDept} hanleApplyClick={hanleApplyClick} tags={tags} dept={dept_arr}/>
          {!showSearchResults && (
            <>
              <CustomCarousel />
              <ComponentList />
            </>
          )}
        </Grid>
        <Grid item  md ={2}  className='left-right-grid'>
          <RightNav setResults={setResults} setDept={setDept} hanleApplyClick={hanleApplyClick} tags={tags} dept={dept_arr}/>
        </Grid>
      </Grid>
    </>
  );
};

export default ComponentStorePage;
