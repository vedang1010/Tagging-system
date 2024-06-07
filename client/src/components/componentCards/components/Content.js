import React from 'react'
import AppDetails from "./AppDetails"
import Screenshots from './Screenshots';
import Description from "./Description"
import Ratings from "./Ratings"
import SystemRequirements from "./SystemRequirements"
import AdditionalInfo from "./AdditionalInfo"
import ImageGallery from './gallery';
const Content = ({ component }) => {
  console.log('component')
  console.log(component)
  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image3.jpg',
    'image3.jpg',
    'image3.jpg',
    // Add more image paths here
  ];
    return (
      <div className='box'>
        <main className="content">
          <AppDetails component={component}/>
        </main>
        <main className="content">
        {/* <ImageGallery images={images} /> */}

          {/* <Screenshots /> */}
        </main>
        <main className="content">
          <Description  component={component}/>
        </main>
        <main className="content">
          <Ratings  component={component}/>
        </main>
        <main className="content">
          <SystemRequirements  component={component}/>
        </main>
        <main className="content">
          <AdditionalInfo  component={component}/>
        </main>
      </div>
    );
  };
  

export default Content
