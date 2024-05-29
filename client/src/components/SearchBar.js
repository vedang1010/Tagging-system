import React from 'react';
import { TextField, Box } from '@mui/material';

function SearchBar() {
  return (
    <Box my={4}>
      <TextField
        fullWidth
        label="Search components"
        variant="outlined"
      />
    </Box>
  );
}

export default SearchBar;
