import React from 'react';
import '../styles/ComponentCard.css';
import Header from '../components/componentCards/components/Header';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Content from '../components/componentCards/components/Content';
// import ComponentStore from './ComponentStore';
import axios from "axios"
import Footer from '../components/Footer'
const ComponentCard = () => {
  async function fetchComponent(componentId) {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/componentCard/fetchComponent/${componentId}`);
      console.log(response.data);
      console.log(response.data[0]._id);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="app">

      <Header />
      <button onClick={() => fetchComponent("666042d68170c800922258c5")} className='button'>try</button>
      <div className="main-content">
        <Content />
        {/* <Sidebar /> */}
      </div>
      <Footer />
    </div>
  );
};

export default ComponentCard;