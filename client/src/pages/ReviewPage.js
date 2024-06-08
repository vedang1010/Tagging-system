
import { Link } from 'react-router-dom';
import styles from '../styles/ReviewPage.module.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";


// Sample images (you can replace these with actual image URLs)
//const[user,setUser]=useState('true');
const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150'
];




function ReviewPage() {
// const [userState, setUserState] = useState(true);
const [components, setComponents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
console.log('userState');


const fetchIdeas = async () => {
  try {
    console.log("Fetching data...");
    const response = await axios.get('http://127.0.0.1:5000/api/review/getAllIdeas');
    setComponents(response.data);
    setLoading(false);
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



  return (
    <div className={styles.ReviewPage}>   
      <ul className={styles.list}>
        {components.map((component, index) =>(
            <li key={component._id} className={styles.Ideas}>
              <div className={styles.card}>
                <Link to={`/review/review1`} className={styles.ComponentPreview}>
                  <img src={component.preview[0]} alt={`Component ${index + 1}`} />
                  <div className={styles.cardContent} >
                    {component.name}
                  </div>
                </Link>
              </div>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewPage;
