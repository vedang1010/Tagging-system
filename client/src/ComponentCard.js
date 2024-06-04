import React from 'react';
import './styles/ComponentCard.css';
import Header from './components/componentCards/components/Header';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Content from './components/componentCards/components/Content';
// import ComponentStore from './ComponentStore';

import Footer from './components/Footer'
const ComponentCard = () => {


  return (
    <div className="app">

      <Header />
      <div className="main-content">
        <Content />
        {/* <Sidebar /> */}
      </div>
      <Footer />
    </div>
  );
};

export default ComponentCard;