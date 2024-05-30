import React from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CardsGrid from './components/CardsGrid';
import { Container, Box } from '@mui/material';

function ComponentStore() {
  return (
    <div>
      <Navbar />
      <Container>
        <Box my={4}>
          <SearchBar />
        </Box>
        <CardsGrid />
      </Container>
    </div>
  );
}

export default ComponentStore;
