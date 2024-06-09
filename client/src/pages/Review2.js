import React,  { useState, useEffect } from 'react';
import styles from '../styles/Review.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Review2 = () => {
  const {objectId} = useParams();
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review'); 
  const [ideas, setIdeas] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contri, setContri] = useState([]);

  try{
    useEffect(() => {
        console.log(" compoenent ",objectId);
        axios.get("http://127.0.0.1:5000/api/review/fetchIdea/" + objectId).then(response =>{
        console.log(response.data);
        const idea = response.data.component  
        console.log(" idea"+idea);      ;
        setIdeas(idea);
        setIsLoading(false);
        setError(false);
      })
      .catch((error)=>{
        console.log("Here is the error ",error);
        setIsLoading(false);
        setError(error);
      })
     },[objectId])
  } catch (error) {
    console.error(error.message+ " over here ");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 'review') {
      setPage('ratings');
    } else {
      //console.log('Form submitted', { rating, remarks });
      setPage('review');
    }
  };

  const handleStarClick1 = (index) => {
    setRating1(index + 1);
  };

  const handleStarClick2 = (index) => {
    setRating2(index + 1);
  };

  const handleReject = () => {
    //console.log('Rejected with remarks', { remarks, rating });
    setPage('ratings');
    
  };

  const handleOnClick =()=>{
     setPage('ratings');
  }

  // const ideas = {
  //   name: 'Example Component',
  //   type: 'UI Element',
  //   details: 'This is a detailed description of the component.',
  //   tags: 'UI, Design, Example',
  //   language: 'JavaScript',
  //   version: '1.0.0',
  //   dependencies: 'React, PropTypes',
  //   input: 'Props',
  //   output: 'UI Component'
  // };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!ideas) {
    return <div>No idea found</div>;
  }

  const { name, type, details, language, version, dependencies, input, output } = ideas;
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Review Idea / Component</h1>
      {page === 'review' ? (
        <>
          <div className={styles.detailsContainer}>
            <div className={styles.imagePreview}>
              <img src={ideas.preview} alt="Component Preview" className={styles.image} />
              <div className={styles.details}>
                <p className={styles.leftText}><strong>Component Name:</strong> {ideas.name}</p>
                <p className={styles.leftText} id={styles.leftdown}><strong>Type:</strong> {ideas.type}</p>
                <p className={styles.leftText} id={styles.leftdown}><strong>Description:</strong> {ideas.description}</p>
                <p className={styles.leftText} id={styles.leftdown}><strong>Version:</strong> {ideas.version}</p>
              </div>
            </div>
            <div className={styles.details}>
              <p>
                <strong>Details:</strong>
                <ol className={styles.detaillist} style={{ listStyleType: "upper-roman" }}>
                  <li className={styles.detailtext}><strong>System Requirements:</strong> {ideas.sys_requirements}</li>
                  <li className={styles.detailtext}><strong>Dependencies:</strong> {ideas.dependencies}</li>
                  <li className={styles.detailtext}><strong>License:</strong> {ideas.license}</li>
                </ol>
              </p>
              <p><strong>Language Used:</strong> {ideas.language}</p>
              <p><strong>Algorithm and time complexity:</strong> {ideas.algorithm}</p>
              <p><strong>Tags:</strong> {ideas.taglist.join(' ')}</p>
              <div className={styles.downloadContainer}>
                <a href="/path/to/download">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                    <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 17H12H8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Download Files
                </a>
              </div>
            </div>
          </div>
          <div className={styles.buttons}>
            <button type="button" className={styles.cancel} onClick={() => setPage('reject')}>Reject</button>
            <button type="button" className={styles.next} onClick={() => setPage('ratings')}>Accept</button>
          </div>
        </>
      ) : (
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h2>{page === 'reject' ? 'Reject Component' : 'Accept Component'}</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="remarks" className={styles.label}>Remarks:</label>
              <textarea
                id="remarks"
                rows="4"
                cols="50"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className={styles.textarea}
              ></textarea>
              <div className={styles.ratingContainer}>
                <span style={{ fontWeight: 'bold' }}>Functional Review:</span>
                <div>
                  {[...Array(5)].map((star, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick1(index)}
                      style={{
                        fontSize: '2em',
                        cursor: 'pointer',
                        color: index < rating1 ? 'gold' : 'gray'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
              </div>
              <div className={styles.ratingContainer}>
                <span style={{ fontWeight: 'bold' }}>Technical Review:</span>
                <div>
                  {[...Array(5)].map((star, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick2(index)}
                      style={{
                        fontSize: '2em',
                        cursor: 'pointer',
                        color: index < rating2 ? 'gold' : 'gray'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
              </div>
              <div className={styles.buttons}>
                <button type="button" className={styles.cancel} onClick={handleOnClick}>Go Back</button>
                <button type="submit" className={styles.next}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default Review2;
