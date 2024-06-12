import React from 'react'
import { useState } from 'react';
import axios from "axios"
const AppDetails = ({component}) => {
    const [details, setDetails] = useState({
      imageUrl: 'https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000',
      appName: component.name,
      rating: component.stars+' ★',
      reviews:component.frequency+ ' views',
      category:component.type,
      downloadLink:component.contributors[component.contributors.length-1].link
    });
    async function updateFrequency(id){
      try {
        console.log("help");
  
        const response = await axios.get(`http://127.0.0.1:5000/api/componentCard/updateFrequency/${id}`);
        console.log(id);
  
        console.log(response)
      } catch (error) {
        console.error(error.message);
      }
      
    }
    const handleDownload = (downloadLink) => {
      if (downloadLink) {
        updateFrequency(component._id);
        // const link = document.createElement('a');
        // link.href = downloadLink; // Use the provided downloadLink parameter
        // link.download = component.name || 'download'; // Use component name or a default name
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      } else {
        console.error('No download link available');
      }
    };
    
  
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
          {/* <button className="cta-button"  >Download Component</button> */}
          <button className="cta-button" onClick={() => handleDownload(details.downloadLink)}>Download Component</button>

        </div>
      </section>
    );
  };

export default AppDetails
