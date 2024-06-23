import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaFileArchive, FaTags, FaGlobe, FaExclamationCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../../../styles/ComponentCard.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdditionalInfo = ({ component }) => {
  const [contributedBy, setContributedBy] = useState([]);
  const [releaseDate, setReleaseDate] = useState(component.contributors[component.contributors.length - 1].date);
  const [approximateSize, setApproximateSize] = useState('132.8 MB');
  const [tags, setTags] = useState(component.taglist);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [installationInfo, setInstallationInfo] = useState('Get this app while signed in...');
  const [supportedLanguages, setSupportedLanguages] = useState('English, Spanish, French, German');
  const [license, setLicense] = useState(component.license);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchContributors = async () => {
      const contributors = await Promise.all(
        component.contributors.map(async (contributor) => {
          const username = await getUsername(contributor.id);
          return { ...contributor, username };
        })
      );
      setContributedBy(contributors);
    };

    fetchContributors();
  }, [component.contributors]);

  const handleModifyClick = (id) => {
    console.log(id)
    navigate(`/modify/${id}`);
  };
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  };

  const getUsername = async (id) => {
    try {
      const url = `${SERVER_URL}api/userinfo/fetchUserInfo/${id}`;
      const response = await axios.get(url);
      return response.data.email; // Assuming response.data contains a user object with an 'email' field
    } catch (error) {
      console.error(`Error fetching user info: ${error.message}`);
    }
  };

  return (
    <section className="additional-info">
      <h2>Additional Information</h2>
      <div className="info-grid">
        <div>
          <FaUser /> <strong>Contributed by:</strong>
          <div className='contribution-list'>
            {contributedBy.map((contributor, index) => (
              <div key={index}>
                {contributor.username}
              </div>
            ))}
          </div>
        </div>
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
        <div><FaGlobe /> <strong>Supported languages:</strong> {supportedLanguages}</div>
        <div><FaExclamationCircle /> <strong>License:</strong> {license}</div>
      </div>
      <div className="button-group">
        <button className="raise-issue"><FaExclamationCircle /> Raise Issue</button>
        <button className="modify-component"  onClick={() => handleModifyClick(component._id)}><FaEdit /> Modify Component</button>
      </div>
    </section>
  );
};

export default AdditionalInfo;
