import React from 'react';
import '../styles/ComponentCard.css';
import Header from '../components/componentCards/components/Header';
import Content from '../components/componentCards/components/Content';
import axios from "axios"
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
const ComponentCard = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  // const response = await axios.post(`${SERVER_URL}api/user/login`, { email, password });

  const { id } = useParams();
  sessionStorage.setItem("location",`/component/${id}`)

// console.log(id);
  const [component, setComponent] = useState(null);

  async function fetchComponent(componentId) {
    try {
      // console.log("help");

      const response = await axios.get(`${SERVER_URL}api/componentCard/fetchComponent/${componentId}`);
      // console.log("help2");

      // console.log(response)
      setComponent(response.data[0]);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    // console.log("id");
    // console.log(id);

    fetchComponent(id);
  }, [id]);
  return (
    <div className="app">

      {/* <Header /> */}
      {/* <button onClick={() => fetchComponent(id)} className='button'>try</button> */}
      <div className="main-content">
      {component ? <Content component={component} /> : <div>Loading...</div>}
        {/* <Sidebar /> */}
      </div>
      <Footer />
    </div>
  );
};

export default ComponentCard;