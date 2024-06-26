// src/components/Layout/RightNav.js
import React, { useEffect, useState ,forwardRef, useImperativeHandle} from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import axios from 'axios';
import CheckboxesTags from './CheckboxesTags';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const RightNav = ({setResults,setDept,hanleApplyClick,tags,dept}) => {
  
  return (
    <Box className="right-nav" display={'flex'} flexDirection={'column'}>
      <Typography variant="h6" component="div">
        Filters
      </Typography>
      <CheckboxesTags  tags={tags} setResults={setResults} placeholder={"Tags"}/>
      <CheckboxesTags tags={dept} setResults={setDept} placeholder={"Department"}/>
      <Button variant='contained'onClick={hanleApplyClick} sx={{width:'85%' , margin:'10px 0px' }} >Apply</Button>
    </Box>
  );
};

export default RightNav;
