// src/components/ComponentStore/Carousel.js
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import styles from '../../styles/Crousel.module.css'

const items = [
  {
    img: 'https://dummyimage.com/900x350/000/fff',
    name: 'Crousel Name 1',
    description: 'Demo Crousel 1 Text'
  },
  {
    img: 'https://dummyimage.com/900x350/000/fff',
    name: 'Crousel Name 2',
    description: 'Demo Crousel 2 Text'
  }
];

const CustomCarousel = () => {
  return (
    <Carousel className={styles.crousel}>
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
      <h2 style={{margin:'5px 10px',fontSize:'1.2rem'}}>{item.name}</h2>
      <p style={{margin:'0px 10px',fontSize:'1rem'}}>{item.description}</p>
      <Button style={{margin:'5px 0px'}} className="CheckButton">Check it out!</Button>
    </Paper>
  );
};

export default CustomCarousel;
