import React from 'react'
import AppDetails from "./AppDetails"
import Screenshots from './Screenshots';
import Description from "./Description"
import Ratings from "./Ratings"
import SystemRequirements from "./SystemRequirements"
import AdditionalInfo from "./AdditionalInfo"

const Content = () => {
    return (
      <div className='box'>
        <main className="content">
          <AppDetails />
        </main>
        <main className="content">
          <Screenshots />
        </main>
        <main className="content">
          <Description />
        </main>
        <main className="content">
          <Ratings />
        </main>
        <main className="content">
          <SystemRequirements />
        </main>
        <main className="content">
          <AdditionalInfo />
        </main>
      </div>
    );
  };
  

export default Content
