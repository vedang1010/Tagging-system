import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/SideNav.module.css';

function Sidenav() {
    return (
      <div className={styles.sidenav}>
        <a href="#component-store"><span className={styles.icon}>&#x1F3A4;</span> Component Store</a>
        <a href="#upload-idea"><span className={styles.icon}>&#x270D;</span> Upload Idea</a>
        <a href="#component-status"><span className={styles.icon}>&#x1F4BB;</span> Component Status</a>
        <a href="#current-issues"><span className={styles.icon}>&#x1F4CB;</span> Current Issues</a>
        <a href="#my-profile"><span className={styles.icon}>&#x1F464;</span> My Profile</a>
        <a href="#leaderboard"><span className={styles.icon}>&#x1F3C6;</span> Leaderboard</a>
        <a href="#community"><span className={styles.icon}>&#x1F5C3;</span> Community</a>
      </div>
    );
  }
  
  export default Sidenav;
