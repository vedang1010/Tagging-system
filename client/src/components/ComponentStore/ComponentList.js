import React, { useState, useEffect } from 'react';
import { Typography, Divider, Button } from '@mui/material';
import { styled } from '@mui/system';
import ComponentItem from './ComponentItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ComponentList = () => {
  const navigate = useNavigate();

  const [mostLiked, setMostLiked] = useState([]);
  const [mostDownload, setMostDownload] = useState([]);
  useEffect(() => {
    const fetchMostLiked = async () => {
      try {
        // get all tags
        const mostLiked_res = await axios.get(`${SERVER_URL}api/ComponentStore/getMostLiked`);
        setMostLiked(mostLiked_res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchMostDownload = async () => {
      try {
        // get all tags
        const mostDownload_res = await axios.get(`${SERVER_URL}api/ComponentStore/getMostFrequent`);
        setMostDownload(mostDownload_res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMostLiked();
    fetchMostDownload();

  }, []);

  const componentsByCategory = {
    'Most Liked' : mostLiked,
    'Most Download': mostDownload,
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
              <StyledCard key={component._id}   >
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