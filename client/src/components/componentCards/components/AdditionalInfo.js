import React from 'react'
import { useState } from 'react';
import { FaUser, FaCalendarAlt, FaFileArchive, FaTags, FaGlobe, FaExclamationCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const AdditionalInfo = () => {
    const [contributedBy, setContributedBy] = useState('LinkedIn');
    const [releaseDate, setReleaseDate] = useState('12/05/2012');
    const [approximateSize, setApproximateSize] = useState('132.8 MB');
    const [tags, setTags] = useState([
      'Social', 'Networking', 'Professional', 'T2', 'T3', 'T4', 'Social3', 'Social3', 'Socialfrf', 'Socialrr', 'Socialfrde', 'Socialrrrerr', 'Socialrrrerreedf', 'Socialrrrerrrtrf', 'Socialrrrerrfred'
    ]);
    const [installationInfo, setInstallationInfo] = useState('Get this app while signed in...');
    const [supportedLanguages, setSupportedLanguages] = useState('English, Spanish, French, German');
    const [legalDisclaimer, setLegalDisclaimer] = useState('Use of this app is subject to the terms and conditions set by LinkedIn.');
  
    return (
      <section className="additional-info">
        <h2>Additional Information</h2>
        <div className="info-grid">
          <div><FaUser /> <strong>Contributed by:</strong> {contributedBy}</div>
          <div><FaCalendarAlt /> <strong>Release date:</strong> {releaseDate}</div>
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
          <div><FaGlobe /> <strong>Installation:</strong> {installationInfo}</div>
          <div><FaGlobe /> <strong>Supported languages:</strong> {supportedLanguages}</div>
          <div><FaExclamationCircle /> <strong>Legal disclaimer:</strong> {legalDisclaimer}</div>
        </div>
        <div className="button-group">
          <button className="raise-issue"><FaExclamationCircle /> Raise Issue</button>
          <button className="modify-component"><FaEdit /> Modify Component</button>
        </div>
      </section>
    );
};
  
export default AdditionalInfo
