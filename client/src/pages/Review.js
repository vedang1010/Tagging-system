import React, { useState } from 'react';
import styles from '../styles/Review.module.css';
const Review = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputText, setInputText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted', { username, password, inputText });
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className={styles.formcontainer}>
      <h1>Review Idea / Component</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Component Name : </label>
       
        
        <label htmlFor="password">Type : </label>
        
        
        <label htmlFor="input-text">Details :</label>
        
        <label htmlFor="input-text">Tags : </label>
        

        <label htmlFor="input-text">Remarks : </label>
        <input 
          type="textarea" 
          rows="10" // Number of rows to display
          cols="50"
        />


      <div style={{ marginTop: '7px', marginBottom:'5px' ,textAlign:'left'}}>
      <span style={{fontWeight:'bold'}}>Ratings:</span> 
      <div>
        {[...Array(5)].map((star, index) => {
          return (
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
          );
        })}
      </div>
      </div>
        
        <button type="button" className={styles.button1}>Download File</button>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel}>Reject</button>
          <button type="submit" className={styles.next}>Accept</button>
        </div>
      </form>
    </div>
  );
};

export default Review;
