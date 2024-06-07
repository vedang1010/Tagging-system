import React from 'react';
import '../styles/ComponentCard.css';

const ImageGallery = ({ images }) => {
  return (
    <div className="gallery-container">
      <div className="gallery">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
