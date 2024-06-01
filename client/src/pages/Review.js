import React, { useState } from 'react';
import styles from '../styles/Review.module.css';
const Review = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputText, setInputText] = useState('Typing |');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted', { username, password, inputText });
  };

  return (
    <div className={styles.formcontainer}>
      <h1>Review Idea / Component</h1>
      <form onSubmit={styles.handleSubmit}>
        <label htmlFor={styles.username}>Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          placeholder="Enter username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Enter password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <small>Your password is between 4 and 12 characters</small>
        
        <label htmlFor="input-text">Input Text Label</label>
        <input 
          type="text" 
          id="input-text" 
          name="input-text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <small>Assistive Text</small>
        
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel}>Cancel</button>
          <button type="submit" className={styles.next}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default Review;
