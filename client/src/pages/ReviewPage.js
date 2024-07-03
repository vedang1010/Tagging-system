
import { Link } from 'react-router-dom';
import '../styles/ReviewPage.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import HtmlRenderer from "../utils/HtmlRenderer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

// Sample images (you can replace these with actual image URLs)
//const[user,setUser]=useState('true');
// const images = [
//   'https://via.placeholder.com/150',
//   'https://via.placeholder.com/150',
//   'https://via.placeholder.com/150'
// ];




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
  <div >
    {isComponents ? (
      <section id="advertisers" className="advertisers-service-sec pt-5 pb-5">
    
        
        <div className="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">
          {components.map((component) => (
          
            <div className="col" key={component._id}>
            <Link to={`/review1/${component.id}/${component._id}`}>
              <div className="service-card">
                
                <h3>{component.name}</h3>
                <p><HtmlRenderer htmlString={component.short_desc != null ? component.short_desc : "Hello "} /></p>
              </div>
            </Link>
            </div>
            
          ))}
        </div>
    
    </section>
    ) : (
      Swal.fire({
        title: "Sorry",
        text: "No Ideas to Review",
        icon: "error",
      })
    )}
  </div>
);
};

export default ReviewPage;