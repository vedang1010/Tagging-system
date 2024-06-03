// src/components/ComponentStore/Carousel.js
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const items = [
  {
    img: 'https://dummyimage.com/900x350/000/fff',
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!'
  },
  {
    img: 'https://dummyimage.com/9 00x350/000/fff',
    name: 'Random Name #2',
    description: 'Hello World!'
  }
];

const CustomCarousel = () => {
  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = ({ item }) => {
  return (
    <Paper >
      <div className="img-cover">
      <img src={item.img} className='carousel-img' />
      </div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
};

export default CustomCarousel;
