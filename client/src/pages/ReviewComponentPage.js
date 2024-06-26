
import { Link } from 'react-router-dom';
import styles from '../styles/ReviewComponentPage.module.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');
// Sample images (you can replace these with actual image URLs)
//const[user,setUser]=useState('true');
const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150'
];





function ReviewComponentPage() {
  sessionStorage.setItem("location","/reviewcomponent")

// const [userState, setUserState] = useState(true);
const [components, setComponents] = useState([]);
const [isComponents, setIsComponents] = useState(false);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [reviewid, setReviewid] = useState(0);
console.log('reviewComponent');


const fetchIdeas = async () => {
  try {
    console.log("Fetching data...");
    const response = await axios.get('http://127.0.0.1:5000/api/review/getAllComponents');
    // console.log(response.data)
    if(response.status === 200) {setIsComponents(true)}
    else setIsComponents(false);

    setComponents(response.data);
    setLoading(false);
    setReviewid(response.data._id);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    setError(error);
    setLoading(false);
  }
};

useEffect(() => {
  fetchIdeas();
}, []); 

useEffect(() => {
  if (error) {
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
}, [error]);

if (loading) {
  return <div>Loading...</div>;
}



  return (
    <div className={styles.ReviewPage}>   
    { isComponents ? 
      <ul className={styles.list}>
        {components.map((component, index) =>(
            <li key={component._id} className={styles.Ideas}>
              <div className={styles.card}>
                <Link to={`/review2/${component.id}/${component._id}`} className={styles.ComponentPreview}>
                  <img src={component.preview[0]} alt={`Component ${index + 1}`} />
                  <div className={styles.cardContent} >
                    {component.name}
                  </div>
                  <hr></hr>
                  <div className={styles.cardContent} >
                    {component.type}
                  </div>
                  <hr />
                  <div 
                    className={styles.cardContent} 
                    style={{ color: component.status_legal === 'accepted' ? 'green' : 'red' }}
                  >
                    Legal Review: {component.status_legal}
                  </div>
                  <div 
                    className={styles.cardContent} 
                    style={{ color: component.status_tech === 'accepted' ? 'green' : 'red' }}
                  >
                    Tech Review: {component.status_tech}
                  </div>
                </Link>
              </div>
            </li>
        ))}
        
      </ul> : Swal.fire({
          title: "Sorry",
          text:"No Components to Review",
          icon: "error"
        })} 
    </div>
    
  );
}

export default ReviewComponentPage;
