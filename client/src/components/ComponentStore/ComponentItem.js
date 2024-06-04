// src/components/ComponentStore/ComponentItem.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ComponentItem = ({ component }) => {
  return (
    <Card className="component-card" >
      <CardMedia
        component="img"
        height="140"
        image={component.imageUrl}
        alt={component.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {component.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {component.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Publisher: {component.publisher}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ratings: {component.ratings}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComponentItem;
