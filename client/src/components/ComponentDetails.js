import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

const components = [
  { id: 1, name: 'Component 1', publisher: 'Publisher 1', ratings: 4.5, image: 'https://via.placeholder.com/150', description: 'Description for Component 1' },
  { id: 2, name: 'Component 2', publisher: 'Publisher 2', ratings: 4.0, image: 'https://via.placeholder.com/150', description: 'Description for Component 2' },
  // Add more components as needed
];

function ComponentDetails() {
  const { id } = useParams();
  const component = components.find(c => c.id === parseInt(id));

  if (!component) {
    return <Typography variant="h6">Component not found</Typography>;
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>{component.name}</Typography>
        <img src={component.image} alt={component.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        <Typography variant="h6" gutterBottom>Publisher: {component.publisher}</Typography>
        <Typography variant="h6" gutterBottom>Ratings: {component.ratings}</Typography>
        <Typography variant="body1">{component.description}</Typography>
      </Box>
    </Container>
  );
}

export default ComponentDetails;
