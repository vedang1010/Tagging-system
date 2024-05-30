import React from 'react';
import { Grid } from '@mui/material';
import CardComponent from './CardComponent';

const components = [
  { id: 1, name: 'Component 1', publisher: 'Publisher 1', ratings: 4.5, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Component 2', publisher: 'Publisher 2', ratings: 4.0, image: 'https://via.placeholder.com/150' },
  // Add more components as needed
];

function CardsGrid() {
  return (
    <Grid container spacing={4} justifyContent="center">
      {components.map((component, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CardComponent component={component} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardsGrid;
