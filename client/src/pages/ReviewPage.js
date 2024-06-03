import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ReviewPage.module.css';

// Sample images (you can replace these with actual image URLs)
const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150'
];

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
