import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  border: '1px solid #e0e0e0',
  borderRadius: '16px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledBox = styled(Box)({
  textDecoration: 'none',
});

function CardComponent({ component }) {
  return (
    <StyledBox component={Link} to={`/Component/${component.id}`}>
      <StyledCard>
        <CardMedia
          component="img"
          height="140"
          image={component.image}
          alt={component.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {component.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publisher: {component.publisher}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ratings: {component.ratings}
          </Typography>
        </CardContent>
      </StyledCard>
    </StyledBox>
  );
}

export default CardComponent;
