import React from 'react'
import { useState } from 'react';
import { FaUser, FaCalendarAlt, FaFileArchive, FaTags, FaGlobe, FaExclamationCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const AdditionalInfo = ({component}) => {
    const [contributedBy, setContributedBy] = useState('LinkedIn');
    const [releaseDate, setReleaseDate] = useState(component.contributors[component.contributors.length-1].date);
    const [approximateSize, setApproximateSize] = useState('132.8 MB');
    const [tags, setTags] = useState(component.taglist);
    // const [tags, setTags] = useState([
    //   'Social', 'Networking', 'Professional', 'T2', 'T3', 'T4', 'Social3', 'Social35', 'Socialfrf', 'Socialrr', 'Socialfrde', 'Socialrrrerr', 'Socialrrrerreedf', 'Socialrrrerrrtrf', 'Socialrrrerrfred'
    // ]);
    const [installationInfo, setInstallationInfo] = useState('Get this app while signed in...');
    const [supportedLanguages, setSupportedLanguages] = useState('English, Spanish, French, German');
    const [license, setLicense] = useState(component.license);
    function formatDate(isoDateString) {
      const date = new Date(isoDateString);
      
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      // const hours = date.getHours().toString().padStart(2, '0');
      // const minutes = date.getMinutes().toString().padStart(2, '0');
      // const seconds = date.getSeconds().toString().padStart(2, '0');
    
      return `${month} ${day}, ${year} `;
    }
    
    // Example usage
    // const humanReadableDate = formatDate("2023-06-05T09:00:00.000Z");
    // console.log(humanReadableDate);
    
    return (
      <section className="additional-info">
        <h2>Additional Information</h2>
        <div className="info-grid">
          <div><FaUser /> <strong>Contributed by:</strong> {contributedBy}</div>
          <div><FaCalendarAlt /> <strong>Release date:</strong> {formatDate(releaseDate)}</div>
          <div><FaFileArchive /> <strong>Approximate size:</strong> {approximateSize}</div>
          <div>
            <FaTags /> <strong>Tags:</strong>
            <div className="tags-container">
              {tags.map(tag => (
                <Link key={tag} to={`/tags/${tag.toLowerCase()}`} className="tag-button">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          {/* <div><FaGlobe /> <strong>Installation:</strong> {installationInfo}</div> */}
          <div><FaGlobe /> <strong>Supported languages:</strong> {supportedLanguages}</div>
          <div><FaExclamationCircle /> <strong>License:</strong> {license}</div>
        </div>
        <div className="button-group">
          <button className="raise-issue"><FaExclamationCircle /> Raise Issue</button>
          <button className="modify-component"><FaEdit /> Modify Component</button>
        </div>
      </section>
    );
};
  
export default AdditionalInfo
