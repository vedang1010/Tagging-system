// src/components/ComponentStore/ComponentItem.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ComponentItem = ({ component }) => {
  return (
    <Card className="component-card" sx={{margin:'1rem 2rem', width:'20rem'}} >
      {component.preview && component.preview[0] && (
        <CardMedia
          component="img"
          height="140"
          image={component.preview[0]} // Use the first preview image URL
          alt={component.name}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {component.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {component.description.short}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {component.likes}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stars: {component.stars}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ComponentItem;
