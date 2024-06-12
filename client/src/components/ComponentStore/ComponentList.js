import React from 'react';
import { Typography, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import ComponentItem from './ComponentItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
const StyledCard = styled('div')({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  },
  marginBottom: '16px', 
});

const ComponentList = () => {
  const navigate = useNavigate();

  const componentsByCategory = {
    DTS: [
      {
        id: '66693aede01afec0ab853b59', title: 'DTS Component 1', description: 'Description of DTS component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 2, title: 'DTS Component 2', description: 'Description of DTS component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 3, title: 'DTS Component 1', description: 'Description of DTS component 3', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 4, title: 'DTS Component 2', description: 'Description of DTS component 4', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 5, title: 'DTS Component 1', description: 'Description of DTS component 5', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 6, title: 'DTS Component 2', description: 'Description of DTS component 6', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      
    ],
    SB: [
      {
        id: 3, title: 'SB Component 1', description: 'Description of SB component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 4, title: 'SB Component 2', description: 'Description of SB component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 3, title: 'SB Component 1', description: 'Description of SB component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 4, title: 'SB Component 2', description: 'Description of SB component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 3, title: 'SB Component 1', description: 'Description of SB component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 4, title: 'SB Component 2', description: 'Description of SB component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      
    ],
    MO: [
      {
        id: 5, title: 'MO Component 1', description: 'Description of MO component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 6, title: 'MO Component 2', description: 'Description of MO component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 5, title: 'MO Component 1', description: 'Description of MO component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 6, title: 'MO Component 2', description: 'Description of MO component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 5, title: 'MO Component 1', description: 'Description of MO component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 6, title: 'MO Component 2', description: 'Description of MO component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      
    ],
    DatabaseConnection: [
      {
        id: 7, title: 'DB Component 1', description: 'Description of DB component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 8, title: 'DB Component 2', description: 'Description of DB component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 7, title: 'DB Component 1', description: 'Description of DB component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 8, title: 'DB Component 2', description: 'Description of DB component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 7, title: 'DB Component 1', description: 'Description of DB component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 8, title: 'DB Component 2', description: 'Description of DB component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      
    ],
    Styling: [
      {
        id: 9, title: 'Styling Component 1', description: 'Description of Styling component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 10, title: 'Styling Component 2', description: 'Description of Styling component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 9, title: 'Styling Component 1', description: 'Description of Styling component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 10, title: 'Styling Component 2', description: 'Description of Styling component 2', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 9, title: 'Styling Component 1', description: 'Description of Styling component 1', publisher: 'Dummy Publisher 3',
        imageUrl: 'https://dummyimage.com/300x200/000/fff',
      },
      {
        id: 10, title: 'Styling Component 2', description: 'Description of Styling component 2', publisher: 'Dummy Publisher 3',
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
    <div className="component-list" style={{marginLeft:'10px', marginRight:'10px' }}>
      {Object.entries(componentsByCategory).map(([category, components]) => (
        <div key={category} >
          <div className="row-headings" style={{display:'flex', justifyContent: 'space-between' , alignItems:'center'}}>
          <Typography variant="h5" gutterBottom marginLeft={'5px'}>{category}</Typography>
          <Button className="ViewMore">View More</Button>
          </div>
          <Slider {...sliderSettings}  >
            {components.map((component) => (
              <StyledCard key={component.id}  onClick={() => handleCardClick(component.id)} >
                <ComponentItem component={component} />
              </StyledCard>
            ))}
          </Slider>
          <Divider sx={{ my: 4 }} />
        </div>
      ))}
    </div>
  );
};

export default ComponentList;