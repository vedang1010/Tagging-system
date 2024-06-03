
import React from 'react';
import styles from '../styles/HomePage.module.css';
import Navbar from '../components/Navbar';
import Sidenav from '../components/SideNav';

function HomePage() {
  return (
    <div className={styles.homepage}>
      <Navbar/>
      <Sidenav />
      <div className="content" style={{ marginLeft: '260px', padding: '20px' }}></div>
    </div>
  );
}

export default HomePage;
