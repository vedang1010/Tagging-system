import React from 'react';
import { Typography, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import ComponentItem from './ComponentItem';
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const ImageGallery = ({images}) => {
  const navigate = useNavigate();
  const StyledCard = styled('div')({
    width: '200px', // Ensure the width is fixed
    height: '200px', // Ensure the height is fixed
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
    },
    margin: '16px', // Add margin to prevent cards from touching each other
  });

  const componentsByCategory = {
    DTS: [
      {
        id: '666042d68170c800922258c5', title: 'DTS Component 1', description: 'Description of DTS component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 2, title: 'DTS Component 2', description: 'Description of DTS component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 3, title: 'DTS Component 3', description: 'Description of DTS component 3', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 4, title: 'DTS Component 4', description: 'Description of DTS component 4', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 5, title: 'DTS Component 5', description: 'Description of DTS component 5', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 6, title: 'DTS Component 6', description: 'Description of DTS component 6', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
    ],
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleCardClick = (id) => {
    navigate(`/component/${id}`);
  };

  return (
    <section  style={{ marginLeft: '1px', marginRight: '1px' }}>
    
        <div>
          
          <Slider {...sliderSettings}>
            
              <StyledCard>
                
              </StyledCard>
              <StyledCard>
                
              </StyledCard>
              <StyledCard>
                
              </StyledCard>
              <StyledCard>
                
              </StyledCard>
          </Slider>
          <Divider sx={{ my: 4 }} />
        </div>
    </section>
  );
};

export default ImageGallery;
