// src/components/Layout/RightNav.js
import React, { useEffect, useState ,forwardRef, useImperativeHandle} from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';
import CheckboxesTags from './CheckboxesTags';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const RightNav = ({setResults,setDept,hanleApplyClick}) => {
  const [tags,setTags] = useState([]);
  useEffect(() => {
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
  const dept = ['DTS','MO','SB'];




  return (
    <Box className="right-nav" display={'flex'} flexDirection={'column'}>
      <Typography variant="h6" component="div">
        Filters
      </Typography>
      <CheckboxesTags  tags={tags} setResults={setResults} placeholder={"Tags"}/>
      <CheckboxesTags tags={dept} setResults={setDept} placeholder={"Department"}/>
      <Button variant='contained'onClick={hanleApplyClick} sx={{width:'88%' , margin:'10px 0px' }} >Apply</Button>
    </Box>
  );
};

export default RightNav;
