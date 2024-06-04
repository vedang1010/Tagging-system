
import { Link } from 'react-router-dom';
import styles from '../styles/ReviewPage.module.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

// Sample images (you can replace these with actual image URLs)
const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150'
];

// useEffect(()=>{
//    const fetchIdeas = async ()=>{
//      try{
//        const reponse = await axios.get('https://localhost:5000/api/review/getAllIdeas');
//      } catch(error){
//          console.error(error.message);
//      }
//    }
// })

function ReviewPage() {


  return (
    <div className={styles.ReviewPage}>
      <h2>Review Page</h2>
      <ul>
      <li className={styles.Ideas}>
          <div className={styles.card}>
            <Link to="/review1" className={styles.CompoentPreview}>
                <img src={images[1]} alt="Component 2" />
                    <div className={styles.cardContent}>
                        Component 1
                    </div>
            </Link>
          </div>
        </li>
        <li className={styles.Ideas}>
          <div className={styles.card}>
            <Link to="/review1" className={styles.CompoentPreview}>
                <img src={images[1]} alt="Component 2" />
                    <div className={styles.cardContent}>
                        Component 2
                    </div>
            </Link>
          </div>
        </li>
        <li className={styles.Ideas}>
          <div className={styles.card}>
            <Link to="/review1" className={styles.CompoentPreview}>
                <img src={images[1]} alt="Component 2" />
                    <div className={styles.cardContent}>
                        Component 3
                    </div>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ReviewPage;
