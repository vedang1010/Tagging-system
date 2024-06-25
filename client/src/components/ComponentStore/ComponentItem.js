// src/components/ComponentStore/ComponentItem.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import HtmlRenderer from '../../utils/HtmlRenderer';
import { useNavigate } from 'react-router-dom';

const ComponentItem = ({ component }) => {
  const navigate = useNavigate();
  console.log(component);
  const handleCardClick = (id) => {
    navigate(`/component/${id}`);
  };
  return (
    <Card className="component-card" sx={{margin:'1rem 2rem'}} onClick={() => handleCardClick(component._id)}>
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
        <HtmlRenderer htmlString={component.description.short} />
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
