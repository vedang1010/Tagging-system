import React, { useState } from 'react';
import styles from '../styles/Review.module.css';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [page, setPage] = useState('review'); // 'review' or 'ratings'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 'review') {
      setPage('ratings');
    } else {
      console.log('Form submitted', { rating, remarks });
      setPage('review');
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleReject = () => {
    console.log('Rejected with remarks', { remarks, rating });
    setPage('ratings');
  };

  const componentDetails = {
    name: 'Example Component',
    type: 'UI Element',
    details: 'This is a detailed description of the component.',
    tags: 'UI, Design, Example',
    language: 'JavaScript',
    version: '1.0.0',
    dependencies: 'React, PropTypes',
    input: 'Props',
    output: 'UI Component'
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Review Idea / Component</h1>
      <div className={styles.detailsContainer}>
        <div className={styles.imagePreview}>
          <img src="https://via.placeholder.com/150" alt="Component Preview" className={styles.image} />
          <div className={styles.details}>
          <p className={styles.leftText}><strong>Component Name:</strong> {componentDetails.name}</p>
          <p className={styles.leftText} id={styles.leftdown}><strong>Type:</strong> {componentDetails.type}</p>
          </div>
        </div>
      <div className={styles.details}>
          
          <p><strong>Details:</strong> {componentDetails.details}</p>
          <p><strong>Language Used:</strong> {componentDetails.language}</p>
          <p><strong>Version:</strong> {componentDetails.version}</p>
          <p><strong>Dependencies:</strong> {componentDetails.dependencies}</p>
          <p><strong>Input:</strong> {componentDetails.input}</p>
          <p><strong>Output:</strong> {componentDetails.output}</p>
          <div className={styles.downloadContainer}>
            <a href="/path/to/download">
            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17H12H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
              Download Files
            </a>
          </div>
        </div>
      </div>
      {page === 'review' ? (
        <div>
          <div className={styles.buttons}>
            <button type="button" className={styles.cancel} onClick={handleReject}>Reject</button>
            <button type="button" className={styles.next} onClick={() => setPage('ratings')}>Accept</button>
          </div>
          
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            rows="4"
            cols="50"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
           
          ></textarea>

          <div className={styles.ratingContainer}>
            <span style={{ fontWeight: 'bold' }}>Ratings:</span>
            <div>
              {[...Array(5)].map((star, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  style={{
                    fontSize: '2em',
                    cursor: 'pointer',
                    color: index < rating ? 'gold' : 'gray'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="button" className={styles.cancel} onClick={() => setPage('review')}>Go Back</button>
            <button type="submit" className={styles.next}>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Review;
