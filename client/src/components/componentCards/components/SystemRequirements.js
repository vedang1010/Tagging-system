import React from 'react'
import { useState } from 'react';


const SystemRequirements = ({component}) => {
    const [requirements] = useState({
      availableOn: 'PC',
      os: 'Windows 10 version or higher',
      architecture: 'x64',
      keyboard: 'Not specified (Minimum), Integrated Keyboard (Recommended)',
      mouse: 'Not specified (Minimum), Integrated Mouse (Recommended)',
      camera: 'Not specified (Minimum), Integrated Camera (Recommended)',
    });
    // const [requirements] = useState({
    //   availableOn: 'PC',
    //   os: 'Windows 10 version or higher',
    //   architecture: 'x64',
    //   keyboard: 'Not specified (Minimum), Integrated Keyboard (Recommended)',
    //   mouse: 'Not specified (Minimum), Integrated Mouse (Recommended)',
    //   camera: 'Not specified (Minimum), Integrated Camera (Recommended)',
    // });
  
    return (
      <section className="system-requirements">
        <h2>System Requirements</h2>
        {/* <div className="requirements-grid">
          <div><strong>Available on:</strong> {requirements.availableOn}</div>
          <div><strong>OS:</strong> {requirements.os}</div>
          <div><strong>Architecture:</strong> {requirements.architecture}</div>
          <div><strong>Keyboard:</strong> {requirements.keyboard}</div>
          <div><strong>Mouse:</strong> {requirements.mouse}</div>
          <div><strong>Camera:</strong> {requirements.camera}</div>
        </div> */}
        {component.sys_requirements}
      </section>
    );
  };
  
export default SystemRequirements
