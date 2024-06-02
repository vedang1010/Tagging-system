import React from 'react'
import { useState } from 'react';

const AppDetails = () => {
    const [details, setDetails] = useState({
      imageUrl: 'https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000',
      appName: 'LinkedIn',
      rating: '4.2 ★',
      reviews: '1.73K ratings',
      category: 'Social'
    });
  
    return (
      <section className="app-details">
        <div className="inner-container">
          <div className="app-info">
            <img src={details.imageUrl} alt={details.appName} />
            <div className="app-meta">
              <h1>{details.appName}</h1>
              <p>{`${details.rating} | ${details.reviews} | ${details.category}`}</p>
            </div>
          </div>
          <button className="cta-button">Download Component</button>
        </div>
      </section>
    );
  };

export default AppDetails
