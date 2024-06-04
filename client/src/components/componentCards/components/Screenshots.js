import React from 'react'
import { useState } from 'react';


const Screenshots = () => {
    const [images] = useState([
      { url: 'https://picsum.photos/id/818/700/700', alt: 'Statue of Liberty' },
      { url: 'https://picsum.photos/id/537/700/700', alt: 'Night Sky' },
      { url: 'https://picsum.photos/id/136/700/700', alt: 'Ravine Between Rocks' },
      { url: 'https://picsum.photos/id/337/700/700', alt: 'Wheat Farm' },
      { url: 'https://picsum.photos/id/737/700/700', alt: 'City Street' },
      { url: 'https://picsum.photos/id/217/700/700', alt: 'Crumbling Pier' },
      { url: 'https://picsum.photos/id/416/700/700', alt: 'Foggy Mountains' },
      { url: 'https://picsum.photos/id/811/700/700', alt: 'Dense Forest' },
      { url: 'https://picsum.photos/id/902/700/700', alt: 'Sunset Over Mountains' },
      { url: 'https://picsum.photos/id/514/700/700', alt: 'SUV in Front of Building' },
      { url: 'https://picsum.photos/id/111/700/700', alt: 'Classic Vehicle' },
      { url: 'https://picsum.photos/id/168/700/700', alt: 'Stacked Rocks' },
      { url: 'https://picsum.photos/id/210/700/700', alt: 'Brick Wall' },
      { url: 'https://picsum.photos/id/270/700/700', alt: 'Waterfront' },
      { url: 'https://picsum.photos/id/315/700/700', alt: 'Overgrown Buildings' },
      { url: 'https://picsum.photos/id/562/700/700', alt: 'Dying Trees' },
      { url: 'https://picsum.photos/id/385/700/700', alt: 'Ocean View' },
    ]);
  
    return (
      <section className="screenshots">
        <h2>Screenshots</h2>
        <div id="mz-gallery-container">
          <div id="mz-gallery">
            {images.map((image, index) => (
              <figure key={index}>
                <img
                  src={image.url}
                  alt={image.alt}
                  width="700"
                  height="700"
                />
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Screenshots
