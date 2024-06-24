
import { Link } from 'react-router-dom';
import styles from '../styles/ReviewPage.module.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

// Sample images (you can replace these with actual image URLs)
//const[user,setUser]=useState('true');
const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150'
];




function ReviewPage() {
  sessionStorage.setItem("location","/reviewidea")

// const [userState, setUserState] = useState(true);
const [components, setComponents] = useState([]);
const [isComponents, setIsComponents] = useState(false);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [reviewid, setReviewid] = useState(0);
console.log('userState');


const fetchIdeas = async () => {
  try {
    console.log("Fetching data...");
    const response = await axios.get('http://127.0.0.1:5000/api/review/getAllIdeas');
      if(response.status === 200  &&  response.data.length > 0)  {setIsComponents(true)}
      else setIsComponents(false);

    setComponents(response.data);
    setReviewid(response.data._id);
    setLoading(false);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    setError(error);
    setLoading(false);
    Swal.fire({
      title: "Sorry",
      text:"No Ideas to Review",
      icon: "error"
    });
  }
};
useEffect(() => {
  if (error) {
    Swal.fire({
      title: "Sorry",
      text: "No idea to review",
      icon: "error",
    });
  }
}, [error]);
useEffect(() => {
  fetchIdeas();
}, []); 

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

  return (
    <div className={styles.ReviewPage}>
      { isComponents ? 
      <ul className={styles.list}>
        {components.map((component, index) =>(
            <li key={component._id} className={styles.Ideas}>
              <div className={styles.card}>
                <Link to={`/review1/${component.id}/${component._id}`} className={styles.ComponentPreview}>
                  <img src={component.preview[0]} alt={`Component ${index + 1}`} />
                  <div className={styles.cardContent} >
                    {component.name}
                  </div>
                  <hr></hr>
                  <div className={styles.cardContent} >
                   
                    {component.type}
                  </div>
                  
                </Link>
              </div>
            </li>
        ))}
      </ul> :
        Swal.fire({
          title: "Sorry",
          text:"No Ideas to Review",
          icon: "error"
        })

}
    </div>
  );
}

export default ReviewPage;
